interface Props {
  total: number;
  handleDeleteClick: () => void;
  clearSelect: () => void;
}

const Header = ({ total, handleDeleteClick, clearSelect }: Props) => {
  return (
    <div className="p-3 border-b text-black font-semibold">
      <div className="flex justify-between items-center">
        <div>
          {total === 0 && <div className="font-bold">Gallery</div>}
          {total > 0 && (
            <div className="flex gap-4">
              <div className="font-semibold">{total} Files Selected</div>
              <button
                className="border border-green-500 text-xs px-1 rounded hover:bg-green-600 hover:text-white transition-all duration-150"
                onClick={clearSelect}
              >
                Reset
              </button>
            </div>
          )}
        </div>
        <div>
          {total > 0 && (
            <button
              onClick={handleDeleteClick}
              className="text-red-500 font-semibold"
            >
              Delete Files
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
