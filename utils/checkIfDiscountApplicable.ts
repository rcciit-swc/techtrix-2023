import { Packages } from "@/interface/Packages";

function removeDuplicates(arr: number[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function checkIfEventsInPackage(
  arr1: number[],
  arr2: number[],
  package_discount_amt: number
) {
  // arr1 is the package event id array
  // arr2 is the registered events array

  const arr1Copy = [...arr1];
  const arr2Copy = [...arr2];

  // filtering out the ids not present in the package
  arr2.forEach((item) => {
    if (!arr1Copy.includes(item)) {
      arr2Copy.splice(arr2Copy.indexOf(item), 1);
    }
  });

  // creating sets of the events in the package
  arr2Copy.sort((a, b) => a - b);

  const sets = new Map();

  for (let i = 0; i < arr2Copy.length; i++) {
    if (sets.has(arr2Copy[i])) {
      sets.set(arr2Copy[i], sets.get(arr2Copy[i]) + 1);
    } else {
      sets.set(arr2Copy[i], 1);
    }
  }

  let minimum_count: number = Number.MAX_VALUE;

  sets.forEach((value, key) => {
    if (value < minimum_count) {
      minimum_count = value;
    }
  });

  console.log(arr2Copy, sets);

  if (sets.size !== arr1.length) return 0;
  return minimum_count * package_discount_amt;
}

export function checkIfDiscountApplicable({
  packages,
  registeredEvents,
}: {
  packages: Packages[];
  registeredEvents: number[];
}): number {
  const package_event_id = packages.map((item: Packages) => item.event_id);
  const package_discount_amts = packages.map((item: Packages) => item.discount);

  const numberOfPackages = [];

  for (let i = 0; i < package_event_id.length; i++) {
    numberOfPackages.push(
      checkIfEventsInPackage(
        package_event_id[i],
        registeredEvents,
        package_discount_amts[i]
      )
    );
  }

  console.log("final", numberOfPackages);

  numberOfPackages.sort((a, b) => b - a);

  return numberOfPackages[0];
}
