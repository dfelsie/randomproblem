import React, { useEffect, useState } from "react";
import localStyles from "./TableHead.module.css";
import SortOption from "../../types/SortOption";
import LeetQuestion from "../../types/LeetQuestion";
type Props = {
  headText: string;
  sortOption: SortOption;
  setSortOption: any;
  setCurrentList: any;
  currentList: LeetQuestion[];
  sortFunc: any;
};
export default function TableHead({
  headText,
  sortOption,
  setSortOption,
  currentList,
  setCurrentList,
  sortFunc,
}: Props) {
  function makeArrow(sortOption: SortOption) {
    if (sortOption.category === headText) {
      if (sortOption.isAscending) {
        return " " + String.fromCharCode(0x23f6);
      }
      return " " + String.fromCharCode(0x23f7);
    }
    return "";
  }
  const arrowVal = makeArrow(sortOption);

  return (
    <th
      className={localStyles.tHead}
      onClick={() => {
        let sortedList = currentList.sort(sortFunc);
        if (sortOption.category === headText) {
          setSortOption({
            isAscending: !sortOption.isAscending,
            category: headText,
          });
          if (!sortOption.isAscending) sortedList = sortedList.reverse();
          setCurrentList(sortedList);
          return;
        }
        setCurrentList(currentList.sort(sortFunc));
        setSortOption({ isAscending: false, category: headText });
      }}
    >
      {" "}
      {headText}
      <span>{arrowVal}</span>{" "}
    </th>
  );
}
