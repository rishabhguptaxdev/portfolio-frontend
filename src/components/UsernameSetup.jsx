import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Loader from "./ui/Loader";
import { updateUserDetails } from "@/services/user";
import { toast } from "sonner"; // Import toast from Sonner

const UsernameSetup = ({ currentUser }) => {
    const [username, setUsername] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!username.trim()) return;
        setIsSaving(true);
        try {
            await updateUserDetails({ username: username.trim() });
            // Redirect to dashboard after saving username
            navigate("/dashboard");
        } catch (error) {
            console.error("Error saving username", error);
            toast(error.message || "An unexpected error occurred");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSkip = () => {
        // Even if skipped, we redirect user to dashboard.
        navigate("/dashboard");
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Set Up Your Unique Username</h2>
            <p className="mb-4">
                Your username will be used to create your public portfolio URL:{" "}
                <code> baseurl/profile/yourusername</code>.
            </p>
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter a unique username"
            />
            <div className="mt-4 flex space-x-4">
                <Button onClick={handleSave} disabled={isSaving || !username.trim()}>
                    {isSaving ? <Loader /> : "Save"}
                </Button>
                <Button variant="outline" onClick={handleSkip}>
                    Skip
                </Button>
            </div>
        </div>
    );
};

export default UsernameSetup;
