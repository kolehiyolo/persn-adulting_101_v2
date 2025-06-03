i have an array called dataSets. each item has the ff typing
export interface DataSet {
  id: string;
  name: string;
  household_id: string;
  household_name: string;
}

CSV of the data is as follows:
ID,name,household_ID,household_name
0003,Kren,0001,Malacca 304
0004,Tristan,0001,Malacca 304

I want to include a select input in the ff component:
export default function DataControls({ 
  handleClickGenerateData,
  dataSets,
  setSelectedDataSet,
}: DataControlsProps) {
  // * Rendering
  return (
    <div
      className='dataControls'
    >
      <!-- INSERT HERE -->
      <button 
        className='button'
        onClick={handleClickGenerateData}
      >
        Generate
      </button>
    </div>
  );
};


1. the select input will render each item of dataSets as an option, with the first one selected as the default
2. when the option is changed, it should trigger a handleDataSetChange() function
3. this function takes the selected dataSet, processes the data as ff:
selectedDataSetName = (`${selectedDataSet.id}-${selectedDataSet.name.replace(/\s+/g, "_") }`)
4. then, it will run setSelectedDataSet(selectedDataSetName)
