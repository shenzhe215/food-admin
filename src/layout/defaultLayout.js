import React, { memo } from "react";
import { FDAppHeader, FDAppContent, FDAppFooter } from "../components/index";
const FDDefaultLayout = memo(() => {
  return (
    <div>
        <FDAppHeader />
        <FDAppContent />
    </div>
  );
});

export default FDDefaultLayout;
