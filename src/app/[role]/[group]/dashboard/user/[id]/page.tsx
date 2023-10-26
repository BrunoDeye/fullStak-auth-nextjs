import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Backend_URL } from '@/lib/Constants';
import { getServerSession } from 'next-auth';
import React from 'react'

type Props = {
  params: {
    id: string;
  };
};


async function ProfilePage(props: Props) {
  const session = await getServerSession(authOptions);
  console.log(session?.backendTokens.accessToken)
  const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  // console.log({ response });
  const user = await response.json();

  if (!user) return;

  return (
    <div className="m-2 border rounded shadow overflow-hidden">
      <div className="p-2 bg-sky-800  text-sky-100 text-center">
        User Profile
      </div>

      <div className="grid grid-cols-2  p-2 gap-2">
        <p className="p-2 text-sky-600">Name:</p>
        <p className="p-2 text-slate-950">{user.name}</p>
        <p className="p-2 text-sky-600">Email:</p>
        <p className="p-2 text-slate-950">{user.email}</p>
      </div>
    </div>
  );
}

export default ProfilePage