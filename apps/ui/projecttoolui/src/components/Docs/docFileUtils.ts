import {
    EDOCLANG,
    EDOCTYPE,
    IDocFile,
    IDocFileContent,
    IProject,
    utilCalculatePhaseDuration,
    utilGetPhaseEndTs,
    utilGetPhaseStartTs,
} from "@frosttroll/projecttoolmodels";
import { docH1, docH2 } from "./parts/docHeaders";
import { docTxt } from "./langs/docLanguage";
import { docKeyValueList } from "./parts/docLists";
import { DateTime } from "luxon";

/**
 * Generate the initial version of the document file without any content
 * @param project
 * @param type
 * @returns
 */
export function docGenerate(project: IProject, type: EDOCTYPE, language: EDOCLANG): IDocFile {
    const filename = `${project.codename.replace(/\s+/g, "_").toLowerCase()}_${type}.docx`;
    const doc: IDocFile = {
        guid: `${project.guid}-docfile-${type}`,
        organizationId: project.organizationId,
        type: type,
        language: language,
        filename: filename,
        createdAt: Date.now(),
        createdBy: "system",
        content: [],
    };

    return doc;
}

/**
 * Change the filename of the document file
 * @param doc
 * @param newFilename
 * @returns
 */
export function docChangeFileName(doc: IDocFile, newFilename: string): IDocFile {
    return {
        ...doc,
        filename: newFilename,
    };
}

/**
 * Generate the initial content for the project plan document
 * @param project
 * @returns
 */
export function docGenerateProjectPlanContent(project: IProject, lang: EDOCLANG): IDocFileContent[] {
    const content: IDocFileContent[] = [];

    // Generate phase sections

    content.push(docH1(docTxt("headers.phases", lang, EDOCTYPE.PROJECTPLAN)));
    project.phases.forEach((phase) => {
        content.push(docH2(phase.name));

        const startTs = utilGetPhaseStartTs(phase, project);
        const endTs = utilGetPhaseEndTs(phase, project);

        const workdays = utilCalculatePhaseDuration(phase, project, true);

        content.push(
            docKeyValueList([
                {
                    key: "START",
                    value: DateTime.fromMillis(startTs).setLocale("fi").toLocaleString(DateTime.DATE_SHORT),
                },
                {
                    key: "END",
                    value: DateTime.fromMillis(endTs).setLocale("fi").toLocaleString(DateTime.DATE_SHORT),
                },
                {
                    key: "WORKDAYS",
                    value: workdays.toString(),

                }
            ])
        );
    });

    return content;
}
