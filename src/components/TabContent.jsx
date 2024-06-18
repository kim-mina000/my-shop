function TabContent({currentTabIndex}) {

  let tabContent;
  if(currentTabIndex === 0){
    tabContent = <div>탭 내용 1</div>;
  } else if (currentTabIndex === 1){
    tabContent = <div>탭 내용 2</div>;
  } else if (currentTabIndex === 2){
    tabContent = <div>탭 내용 3</div>;
  } else if (currentTabIndex === 3){
    tabContent = <div>탭 내용 4</div>;
  }

  return (
    <>
      {tabContent}
    </>
  );
};

export default TabContent;