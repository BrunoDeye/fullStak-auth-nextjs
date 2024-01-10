import { WarrantyData } from "@/types/warranty.type";
import dateFormatter from "./dateFormatter";
import findMostRecentUpdate from "./findMostRecentUpdate";
import { mapGroups } from "./mapGroupsFromBack";

export default function transformArray(array: WarrantyData[]) {

  
  if (array.length === 0) return [];
  // console.log(array)
  return array.map(item => {
    const transformedItem = {
      id: item.id,
      status: findMostRecentUpdate(item.usersUpdates)!.status,
      caseOrigin: item.caseOrigin || null,
      createdAt: item.createdAt as any ,
      approvalDate: item.approvalDate as any || null,
      reasonToDisapprove: item.reasonToDisapprove || null,
      warrantyType: item.warrantyType || null,
      comments: item.comments || null,
      priority: item.priority || null,
      author: item.registration.name,
      authorTitle: mapGroups(item.author.group.title as any),
      serialNumber: item.productsWarranty.map((product) => product.serialNumber).join(" • "),
      model: item.productsWarranty.map((product) => product.model).join(" • "),
      fault: item.productsWarranty.map((product) =>  `${product.model}: [${[...product.fault].join(", ")}]` ).flat().join(" • ")
    };

    return transformedItem;
  });
}