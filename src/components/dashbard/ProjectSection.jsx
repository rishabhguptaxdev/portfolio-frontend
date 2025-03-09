import React, { useEffect, useState } from "react";
import { getAllProjects, addProject, updateProject, deleteProject } from "../../services/project";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { PenIcon, TrashIcon, PlusIcon, SaveIcon } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../components/ui/dialog";
import Loader from "../../components/ui/Loader";

const initialProjectState = {
    projectName: "",
    projectThumbnailURLs: [],
    projectDescription: "",
    projectCategory: [],
    dateOfProject: {
        startYear: "",
        startMonth: "",
        startDay: "",
        endYear: "",
        endMonth: "",
        endDay: "",
    },
    contributers: [],
    techUsed: [],
};

const ProjectSection = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState(initialProjectState);
    const [expanded, setExpanded] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setNewProject(initialProjectState);
        setEditingItem(null);
    };

    const handleSave = async () => {
        setActionLoading(true);
        try {
            if (editingItem) {
                await updateProject(editingItem, newProject);
            } else {
                await addProject(newProject);
            }
            await fetchData();
            resetForm();
            setExpanded(false);
        } catch (error) {
            console.error("Failed to save project:", error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        setActionLoading(true);
        try {
            await deleteProject(deleteItemId);
            await fetchData();
        } catch (error) {
            console.error("Failed to delete project:", error);
        } finally {
            setActionLoading(false);
            setDeleteItemId(null);
        }
    };

    const handleEdit = (project) => {
        setNewProject(project);
        setEditingItem(project._id);
        setExpanded(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Loader />
                ) : expanded ? (
                    <div className="space-y-4">
                        <Input
                            placeholder="Project Name"
                            value={newProject.projectName}
                            onChange={(e) =>
                                setNewProject({ ...newProject, projectName: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Project Thumbnail URLs (comma separated)"
                            value={newProject.projectThumbnailURLs.join(",")}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    projectThumbnailURLs: e.target.value.split(","),
                                })
                            }
                        />
                        <Input
                            placeholder="Project Description"
                            value={newProject.projectDescription}
                            onChange={(e) =>
                                setNewProject({ ...newProject, projectDescription: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Project Category (comma separated)"
                            value={newProject.projectCategory.join(",")}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    projectCategory: e.target.value.split(","),
                                })
                            }
                        />
                        <Input
                            placeholder="Start Year"
                            value={newProject.dateOfProject.startYear}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    dateOfProject: {
                                        ...newProject.dateOfProject,
                                        startYear: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="Start Month"
                            value={newProject.dateOfProject.startMonth}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    dateOfProject: {
                                        ...newProject.dateOfProject,
                                        startMonth: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="Start Day"
                            value={newProject.dateOfProject.startDay}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    dateOfProject: {
                                        ...newProject.dateOfProject,
                                        startDay: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Year"
                            value={newProject.dateOfProject.endYear}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    dateOfProject: {
                                        ...newProject.dateOfProject,
                                        endYear: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Month"
                            value={newProject.dateOfProject.endMonth}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    dateOfProject: {
                                        ...newProject.dateOfProject,
                                        endMonth: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Day"
                            value={newProject.dateOfProject.endDay}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    dateOfProject: {
                                        ...newProject.dateOfProject,
                                        endDay: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="Contributers (comma separated)"
                            value={newProject.contributers.join(",")}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    contributers: e.target.value.split(","),
                                })
                            }
                        />
                        <Input
                            placeholder="Tech Used (comma separated)"
                            value={newProject.techUsed.join(",")}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    techUsed: e.target.value.split(","),
                                })
                            }
                        />
                        <Button onClick={handleSave} className="w-full">
                            {actionLoading ? (
                                <Loader />
                            ) : editingItem ? (
                                <>
                                    <SaveIcon className="mr-2 h-4 w-4" /> Update Project
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="mr-2 h-4 w-4" /> Add Project
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={() => {
                                resetForm();
                                setExpanded(false);
                            }}
                            variant="outline"
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => setExpanded(true)} className="w-full" variant="outline">
                        <PlusIcon className="mr-2 h-4 w-4" /> Add New Project
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                {projects.map((project) => (
                    <Card key={project._id} className="w-full">
                        <CardHeader>
                            <CardTitle>{project.projectName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{project.projectDescription}</p>
                            <p>{project.projectCategory.join(", ")}</p>
                            <p>
                                {project.dateOfProject.startYear}-{project.dateOfProject.startMonth}
                                -{project.dateOfProject.startDay} to {project.dateOfProject.endYear}
                                -{project.dateOfProject.endMonth}-{project.dateOfProject.endDay}
                            </p>
                            <p>{project.contributers.join(", ")}</p>
                            <p>{project.techUsed.join(", ")}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                                <PenIcon className="h-4 w-4" />
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeleteItemId(project._id)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently
                                            delete the project.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setDeleteItemId(null)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button variant="destructive" onClick={handleDelete}>
                                            {actionLoading ? <Loader /> : "Delete"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </CardFooter>
        </Card>
    );
};

export default ProjectSection;
