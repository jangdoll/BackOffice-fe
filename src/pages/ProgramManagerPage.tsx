import { PageToolbar } from "../components/PageToolbar";
import { SearchView } from "../components/SearchView";
import { ProgramBasicInfo } from "../components/ProgramBasicInfo";
import { ProgramGrid } from "../components/ProgramGrid";

export default function ProgramManagerPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <PageToolbar />
      <SearchView />
      <ProgramBasicInfo />
      <ProgramGrid />
    </div>
  );
}
