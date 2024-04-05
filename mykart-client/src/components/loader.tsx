function Loader() {
  return <h1 className="container">Loading...</h1>;
}

export default Loader;

export const Skeleton = ({ width = "unset" }: { width?: string }) => {
  return (
    <div className="skeletonloader">
      <div className="skeletonbox" style={{ width: width }}></div>
      <div className="skeletonbox" style={{ width: width }}></div>
      <div className="skeletonbox" style={{ width: width }}></div>
      <div className="skeletonbox" style={{ width: width }}></div>
    </div>
  );
};
