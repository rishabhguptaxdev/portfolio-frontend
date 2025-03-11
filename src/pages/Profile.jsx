import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
// Assume this service fetches a user's portfolio by username.
import { getUserPortfolio } from "../services/user";

const Profile = () => {
    const { username } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            setIsLoading(true);
            try {
                const data = await getUserPortfolio(username);
                // Only show portfolio if it is marked live.
                if (data && data.isPortfolioLive) {
                    setPortfolio(data);
                } else {
                    setError("Portfolio is not live or not found.");
                }
            } catch (err) {
                console.error(err);
                setError("Error fetching portfolio.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolio();
    }, [username]);

    if (isLoading) return <Loader />;
    if (error) return <p className="p-4 text-center">{error}</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{portfolio.name}'s Portfolio</h1>
            {/* Render portfolio details (About, Work, Projects, etc.) */}
            {/* For example: */}
            <div>
                <h2>About</h2>
                <p>{portfolio.about && portfolio.about.introductionContent}</p>
                {/* Add more sections as needed */}
            </div>
        </div>
    );
};

export default Profile;
