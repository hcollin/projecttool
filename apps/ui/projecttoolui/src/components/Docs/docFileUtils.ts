import {
	EDOCITEMTYPE,
	EDOCLANG,
	EDOCTYPE,
	IDocFile,
	IDocFileContent,
	IDocFileCover,
	IProject,
	utilCalculatePhaseDuration,
	utilGetPhaseEndTs,
	utilGetPhaseStartTs,
} from "@frosttroll/projecttoolmodels";
import { docH1, docH2, docH3 } from "./parts/docHeaders";
import { docTxt } from "./langs/docLanguage";
import { docKeyValueList } from "./parts/docLists";
import { DateTime } from "luxon";
import { PROJECTPLAN_TEMPLATE_DEFAULT_EN } from "./templates/projectplans/defaultplan_en";
import { IDocFileHeader } from "common/projecttoolmodels/dist/src/models/files/iDocFile";

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
	const content: IDocFileContent[] = [...PROJECTPLAN_TEMPLATE_DEFAULT_EN];

	// Replace cover texts
	const coverIndex = content.findIndex((item) => item.type === EDOCITEMTYPE.COVER);
	if (coverIndex !== -1) {
		const cover = content[coverIndex] as IDocFileCover;

		if (cover.type === EDOCITEMTYPE.COVER) {
			cover.title = project.realname || project.codename;
			if (project.clientName) {
				cover.client = project.clientName;
			}
		}
	}

	// Generate phase parts
	const phases: IDocFileContent[] = [];
	project.phases.forEach((phase) => {
		phases.push(docH3(phase.name));

		const startTs = utilGetPhaseStartTs(phase, project);
		const endTs = utilGetPhaseEndTs(phase, project);

		const workdays = utilCalculatePhaseDuration(phase, project, true);

		phases.push(
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
				},
			]),
		);
	});
	const insertIndex = content.findIndex((item) => item.type === EDOCITEMTYPE.HEADER && (item as IDocFileHeader).targetingKey === "phases");
	if (insertIndex !== -1) {
		content.splice(insertIndex + 1, 0, ...phases);
	}

	return content;
}
