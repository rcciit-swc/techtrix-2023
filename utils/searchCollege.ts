import collegeArr from "./collegeArray";

export function searchCollege({
  collegeInput = "",
  setSuggestions,
}: {
  collegeInput: string;
  setSuggestions: (...args: any) => void;
}) {
  let suggestionsArr = [];
  if (collegeInput.length > 2) {
    const colleges = collegeArr.filter((college) =>
      college.toLowerCase().includes(collegeInput.toLowerCase())
    );

    suggestionsArr = colleges.slice(0, 5);
  }

  setSuggestions(suggestionsArr);
}
