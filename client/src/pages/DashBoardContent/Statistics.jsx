import React, { useEffect } from 'react'
import CountUp from "react-countup";
import classes from "./Statistics.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../redux/stats/statsSlice';
import { toast } from 'react-toastify';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Legend,
} from "recharts";
import Spinner from "../../UI/Spinner";
import Card from "../../UI/Card";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const Statistics = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(state => state?.stats);
    const darkMode = useSelector(state => state?.theme?.darkMode);
    const { isAuthenticated } = useSelector(state => state?.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchStatistics())
                .unwrap()
                .catch(err => {
                    toast.error(err?.message || "Failed to fetch statistics");
                });
        }
    }, [dispatch, isAuthenticated]); // Added isAuthenticated to dependencies

    // Early return for loading state
    if (loading) {
        return <Spinner />;
    }

    // Early return for error state
    if (error) {
        return (
            <Card>
                {error}
            </Card>
        );
    }

    // Check if data is null or undefined before attempting to render charts
    if (!data) {
        return (
            <div className={`${classes.statistics} ${darkMode ? classes.dark : classes.light}`}>
                <p>No statistics available. Please create a resume first.</p>
            </div>
        );
    }

    const templateData = Object.entries(data.templateUsage || {}).map(([key, value]) => ({
        name: key,
        value
    }));

    const sectionData = Object.entries(data.sectionCoverage || {}).map(([key, value]) => ({
        name: key,
        value
    }));

    const activityData = (data.activity || []).map((item) => ({
        name: new Date(item.createdAt).toLocaleDateString(),
        created: 1,
        updated: item.updatedAt ? 1 : 0,
    }));

    return (
        <div className={`${classes.statistics} ${darkMode ? classes.dark : classes.light}`}>
            <header className={classes.header}>
                <h1 className={classes.heading}>Resume Statistics</h1>
                <p className={classes.subheading}>Insights into your resume usage and coverage</p>
            </header>

            {/* Quick Stats */}
            <section className={classes.quickStats}>
                <div className={classes.card}>
                    <h3>Total Resumes</h3>
                    <p><CountUp end={data.totalResume || 0} duration={1.5} /></p>
                </div>
                <div className={classes.card}>
                    <h3>Unique Skills</h3>
                    <p><CountUp end={data.uniqueSkills || 0} duration={1.5} /></p>
                </div>
                <div className={classes.card}>
                    <h3>Total Skills Listed</h3>
                    <p><CountUp end={data.allSkills?.length || 0} duration={1.5} /></p>
                </div>
            </section>

            {/* Template Usage */}
            <section className={classes.chartSection}>
                <h3>Template Usage</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={templateData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {templateData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </section>

            {/* Section Coverage */}
            <section className={classes.chartSection}>
                <h3>Resume Section Coverage</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sectionData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            {/* Activity Timeline */}
            <section className={classes.chartSection}>
                <h3>Resume Activity Timeline</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="created" stroke="#00C49F" />
                        <Line type="monotone" dataKey="updated" stroke="#FF8042" />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        </div>
    );
};

export default Statistics;