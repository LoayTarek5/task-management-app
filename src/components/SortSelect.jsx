import { useSelector, useDispatch } from "react-redux";
import { setSortBy } from "../store/slices/tasksSlice.js";
import { selectSortBy } from "../store/selectors.js";

const SORT_OPTIONS = [
  { value: "created", label: "Date Created", emoji: "📅" },
  { value: "priority", label: "Priority", emoji: "🚨" },
  { value: "dueDate", label: "Due Date", emoji: "⏰" },
  { value: "title", label: "Title (A-Z)", emoji: "🔤" },
];

const SortSelect = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector(selectSortBy);

  const handleChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-500 whitespace-nowrap">
        Sort by:
      </label>
      <select
        value={sortBy}
        onChange={handleChange}
        className="select text-sm py-1.5"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.emoji} {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
