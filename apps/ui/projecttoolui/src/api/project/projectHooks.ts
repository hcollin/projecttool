import { IProjectBase } from "@frosttroll/projecttoolmodels";
import { useCallback, useEffect, useState } from "react";
import { apiGetSimpleProjectList } from "./apiProject";

/**
 * Load a list of all projects in their IProjectBase form. This list should be used for selecting projects etc. as the full project data is needed for saving and editing it.
 * @returns
 */
export const useProjectsSimple = (): [IProjectBase[], boolean, () => void] => {
    const [prjs, setPrjs] = useState<IProjectBase[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchProjects() {
            setLoading(true);
            const projects = await apiGetSimpleProjectList();
            if (projects) {
                setPrjs(projects);
            }
            setLoading(false);
        }

        void fetchProjects();
    }, []);

    const reload = useCallback(() => {
        async function fetchProjects() {
            setLoading(true);
            const projects = await apiGetSimpleProjectList();
            if (projects) {
                setPrjs(projects);
            }
            setLoading(false);
        }

        void fetchProjects();
    }, []);

    return [prjs, loading, reload];
};
