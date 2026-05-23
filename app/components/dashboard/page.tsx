import Button from "@/app/ui/button";

const DashBoardPage = () => {
  return (
    <div>
      <div className="">
        <div className="flex justify-between">
          <h1 className="">Overview</h1>
          <Button buttonText="+ New Link" className="" />
        </div>
        <section>section1</section>
        <section>section2 for chart</section>
        <section>section3 for My links</section>
      </div>
    </div>
  );
};

export default DashBoardPage;
