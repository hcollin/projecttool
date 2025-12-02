import { IDocFileCover } from "@frosttroll/projecttoolmodels";

const DocRenderCover = (props: { doc: IDocFileCover }) => {
    return (
        <>
            <h1 className="main-title" style={{ fontSize: "3rem" }}>
                {props.doc.title}
            </h1>
            {props.doc.subtitle && (
                <h2 className="sub-title" style={{ fontSize: "2rem" }}>
                    {props.doc.subtitle}
                </h2>
            )}
            {props.doc.client && <h3>Client: {props.doc.client}</h3>}
            {props.doc.writers && <h3>Writers: {props.doc.writers.join(", ")}</h3>}
        </>
    );
};

export default DocRenderCover;