type SortOption = {
  isAscending: boolean;
  category:
    | "Number"
    | "Difficulty"
    | "Name"
    | "Likes"
    | "Dislikes"
    | "Percent Liked";
};

export default SortOption;
