import React, { useEffect, useState } from "react";
import {
    getAllWorkExperiences,
    addWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
} from "../../services/workExperience";
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

const initialWorkExperienceState = {
    companyName: "",
    companyWebsiteURL: "",
    jobDesignation: "",
    employmentType: "",
    location: "",
    description: "",
    techUsed: [],
    durationOfWork: {
        startYear: "",
        startMonth: "",
        startDay: "",
        endYear: "",
        endMonth: "",
        endDay: "",
    },
};

const WorkExperienceSection = () => {
    const [workExperiences, setWorkExperiences] = useState([]);
    const [newWorkExperience, setNewWorkExperience] = useState(initialWorkExperienceState);
    const [expanded, setExpanded] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getAllWorkExperiences();
            setWorkExperiences(data);
        } catch (error) {
            console.error("Failed to fetch work experiences:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setNewWorkExperience(initialWorkExperienceState);
        setEditingItem(null);
    };

    const handleSave = async () => {
        setActionLoading(true);
        try {
            if (editingItem) {
                await updateWorkExperience(editingItem, newWorkExperience);
            } else {
                await addWorkExperience(newWorkExperience);
            }
            await fetchData();
            resetForm();
            setExpanded(false);
        } catch (error) {
            console.error("Failed to save work experience:", error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        setActionLoading(true);
        try {
            await deleteWorkExperience(deleteItemId);
            await fetchData();
        } catch (error) {
            console.error("Failed to delete work experience:", error);
        } finally {
            setActionLoading(false);
            setDeleteItemId(null);
        }
    };

    const handleEdit = (workExp) => {
        setNewWorkExperience(workExp);
        setEditingItem(workExp._id);
        setExpanded(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Loader />
                ) : expanded ? (
                    <div className="space-y-4">
                        <Input
                            placeholder="Company Name"
                            value={newWorkExperience.companyName}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    companyName: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Job Designation"
                            value={newWorkExperience.jobDesignation}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    jobDesignation: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Employment Type"
                            value={newWorkExperience.employmentType}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    employmentType: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Location"
                            value={newWorkExperience.location}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    location: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Description"
                            value={newWorkExperience.description}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    description: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder="Tech Used (comma separated)"
                            value={newWorkExperience.techUsed.join(",")}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    techUsed: e.target.value.split(","),
                                })
                            }
                        />
                        <Input
                            placeholder="Start Year"
                            value={newWorkExperience.durationOfWork.startYear}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    durationOfWork: {
                                        ...newWorkExperience.durationOfWork,
                                        startYear: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="Start Month"
                            value={newWorkExperience.durationOfWork.startMonth}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    durationOfWork: {
                                        ...newWorkExperience.durationOfWork,
                                        startMonth: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="Start Day"
                            value={newWorkExperience.durationOfWork.startDay}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    durationOfWork: {
                                        ...newWorkExperience.durationOfWork,
                                        startDay: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Year"
                            value={newWorkExperience.durationOfWork.endYear}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    durationOfWork: {
                                        ...newWorkExperience.durationOfWork,
                                        endYear: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Month"
                            value={newWorkExperience.durationOfWork.endMonth}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    durationOfWork: {
                                        ...newWorkExperience.durationOfWork,
                                        endMonth: e.target.value,
                                    },
                                })
                            }
                        />
                        <Input
                            placeholder="End Day"
                            value={newWorkExperience.durationOfWork.endDay}
                            onChange={(e) =>
                                setNewWorkExperience({
                                    ...newWorkExperience,
                                    durationOfWork: {
                                        ...newWorkExperience.durationOfWork,
                                        endDay: e.target.value,
                                    },
                                })
                            }
                        />
                        <Button onClick={handleSave} className="w-full">
                            {actionLoading ? (
                                <Loader />
                            ) : editingItem ? (
                                <>
                                    <SaveIcon className="mr-2 h-4 w-4" /> Update Work Experience
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="mr-2 h-4 w-4" /> Add Work Experience
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
                        <PlusIcon className="mr-2 h-4 w-4" /> Add New Work Experience
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                {workExperiences.map((workExp) => (
                    <Card key={workExp._id} className="w-full">
                        <CardHeader>
                            <CardTitle>{workExp.companyName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{workExp.jobDesignation}</p>
                            <p>{workExp.employmentType}</p>
                            <p>{workExp.location}</p>
                            <p>{workExp.description}</p>
                            <p>{workExp.techUsed.join(", ")}</p>
                            <p>
                                {workExp.durationOfWork.startYear}-
                                {workExp.durationOfWork.startMonth}-
                                {workExp.durationOfWork.startDay} to{" "}
                                {workExp.durationOfWork.endYear}-{workExp.durationOfWork.endMonth}-
                                {workExp.durationOfWork.endDay}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(workExp)}>
                                <PenIcon className="h-4 w-4" />
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeleteItemId(workExp._id)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently
                                            delete the work experience.
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

export default WorkExperienceSection;
