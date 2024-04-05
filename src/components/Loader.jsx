
const Loader = (props) => {
  const {clase} = props;
  return (
    <section className={`loader ${clase}`}>
      <img src="../assets/misc/loader.gif" alt="loader" width="20px"/>
    </section>
  );
};

export default Loader;
