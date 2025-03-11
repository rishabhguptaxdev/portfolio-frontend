import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Switch } from "../ui/Switch"; // Your ShadCN switch component
import Loader from "../ui/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "@/services/user"; // API service to update user details
import { setUserDetails } from "@/store/userSlice"; // Redux action to update user details

const GoLiveCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [isLive, setIsLive] = useState(user?.isPortfolioLive || false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Sync local state with Redux store whenever user data updates
    useEffect(() => {
        if (user) {
            setIsLive(user.isPortfolioLive);
        }
    }, [user]);

    const handleToggle = async (checked) => {
        setErrorMessage(null);
        // If username is not set, prompt the user and redirect to username setup.
        if (!user?.username) {
            navigate("/username-setup");
            return;
        }
        setIsUpdating(true);
        try {
            // Update the user's live flag on the backend
            const updatedUser = await updateUserDetails({ isPortfolioLive: checked });
            // Update Redux store with the updated user details
            dispatch(setUserDetails(updatedUser.user));
            setIsLive(checked);
        } catch (error) {
            console.error("Error updating portfolio live status", error);
            setErrorMessage("Failed to update portfolio live status. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    // If user data isn't loaded, show a loader
    if (!user) return <Loader />;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Go Live</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    Toggle the slider to make your portfolio live. When live, your portfolio will be
                    available at <code>baseurl/profile/{user.username || "yourusername"}</code>.
                </p>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                {isUpdating ? (
                    <Loader />
                ) : (
                    <Switch checked={isLive} onCheckedChange={handleToggle} />
                )}
                <span>{isLive ? "Live" : "Offline"}</span>
            </CardFooter>
        </Card>
    );
};

export default GoLiveCard;
