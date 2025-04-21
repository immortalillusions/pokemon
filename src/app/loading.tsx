export default function Loading() {
    return(
        <div
            className="w-12 h-12 border-4 border-white border-b-yellow-400 rounded-full animate-spin"
            style={{
              animation: "spin-custom 1s linear infinite",
            }}
          ></div>
    );
}