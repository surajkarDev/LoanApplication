import React ,{ forwardRef, useImperativeHandle,memo} from "react";

const LoanDetail = (props, ref) => {
    const loanDataCLick = () => {
        console.log("Loan Detail Clicked");
    }
    useImperativeHandle(ref, () => ({
        loanDataCLick
    }))
    console.log("Loan Detail Rendered");
    return (
        <>
        <div>Loan Detail Component</div>
        </>
    );
}

export default memo(forwardRef(LoanDetail));