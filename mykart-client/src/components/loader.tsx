function Loader() {
  return <>Loading...</>;
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
