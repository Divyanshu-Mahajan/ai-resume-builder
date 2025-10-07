import React from 'react';
import classes from './Templates.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    CleanModernResume, CompactGridResume, ElegantSidebarResume, ElegantTimelineResume,
    MinimalistResume, MinimalistTwoColumnResume, MonochromeResume, SidebarAccentResume, SidebarResume,
    SmartResume
} from '../templates';

import cleanModernThumb from '../assets/thumbnails/CleanModernThumb.png';
import compactGridThumb from '../assets/thumbnails/CompactGridThumb.png';
import elegantSidebarThumb from '../assets/thumbnails/ElegantsidebarThumb.png';
import elegantTimelineThumb from '../assets/thumbnails/ElegantTimelineThumb.png';
import minimalistThumb from '../assets/thumbnails/MinimalistThumb.png';
import minimalistTwoColumnThumb from '../assets/thumbnails/MinimalistTwoColumnThumb.png';
import monochromeThumb from '../assets/thumbnails/MonochromeThumb.png';
import sidebarAccentThumb from '../assets/thumbnails/SidebarAccentThumb.png';
import sidebarThumb from '../assets/thumbnails/SidebarThumb.png';
import smartThumb from '../assets/thumbnails/SmartThumb.png';
import { FaMagic, FaEye } from 'react-icons/fa';
import { addTemplate } from '../redux/slice/resumeSlice';


const templates = [
    { name: 'Clean Modern', route: "CleanModernResume", Component: CleanModernResume, thumb: cleanModernThumb },
    { name: 'Compact Grid', route: "CompactGridResume", Component: CompactGridResume, thumb: compactGridThumb },
    { name: 'Elegant Sidebar', route: "ElegantSidebarResume", Component: ElegantSidebarResume, thumb: elegantSidebarThumb },
    { name: 'Elegant Timeline', route: "ElegantTimelineResume", Component: ElegantTimelineResume, thumb: elegantTimelineThumb },
    { name: 'Minimalist', route: "MinimalistResume", Component: MinimalistResume, thumb: minimalistThumb },
    { name: 'Minimalist Two Column', route: "MinimalistTwoColumnResume", Component: MinimalistTwoColumnResume, thumb: minimalistTwoColumnThumb },
    { name: 'Monochrome', route: "MonochromeResume", Component: MonochromeResume, thumb: monochromeThumb },
    { name: 'Sidebar Accent', route: "SidebarAccentResume", Component: SidebarAccentResume, thumb: sidebarAccentThumb },
    { name: 'Sidebar', route: "SidebarResume", Component: SidebarResume, thumb: sidebarThumb },
    { name: 'Smart', route: "SmartResume", Component: SmartResume, thumb: smartThumb },
];


const Templates = () => {
    const dispatch = useDispatch();
    const resume = useSelector((state) => state.resume);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const navigate = useNavigate();

    const cardClickHandler = (route) => {
        dispatch(addTemplate(route));
        navigate(`/templates/${route}`);
    }

    return (
        <div className={`${classes.templates} ${darkMode === 'dark' ? classes.dark : classes.light}`}>
            <header className={classes.header}>
                <h1>
                    <FaMagic /> Choose Your Template
                </h1>
            </header>
            <div className={classes.templateGrid}>
                {
                    templates.map(({ name, route, thumb }) => (
                        <div key={name} className={classes.card} onClick={() => cardClickHandler(route)}>
                            <div className={classes.wrapper}>
                                <div className={classes.thumb}>
                                    <img src={thumb} alt={`${name} Template`} className={classes.thumbImg} />
                                </div>
                                <h2 className={classes.cardName}>{name}</h2>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Templates;
