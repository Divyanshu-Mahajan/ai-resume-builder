import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CleanModernResume, CompactGridResume, ElegantSidebarResume, ElegantTimelineResume, MinimalistResume, MinimalistTwoColumnResume, MonochromeResume, SidebarAccentResume, SidebarResume, SmartResume } from "../../templates/index.js";
import { fetchSingleResume } from '../../redux/slice/resumeSlice';
import Spinner from '../../UI/Spinner';
import Card from '../../UI/Card';
import html2pdf from 'html2pdf.js';
import classes from "./SingleResume.module.css";
import { toast } from 'react-toastify';


const templates = {
  CleanModernResume,
  CompactGridResume,
  ElegantSidebarResume,
  ElegantTimelineResume,
  MinimalistResume,
  MinimalistTwoColumnResume,
  MonochromeResume,
  SidebarAccentResume,
  SidebarResume,
  SmartResume
}
const SingleResume = () => {
  const { id } = useParams();
  const { currentResume, loading, error } = useSelector(state => state?.resume);
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state?.theme?.darkMode);

  const resumeRef = useRef()

  //Fetch the Selected resume when the user click on the view button
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleResume(id));
    }
  }, [id, dispatch]);

  const downloadButtonHandler = () => {
    if (!resumeRef.current) return;

    toast.info("Generating PDF....");

    const opt = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: `${currentResume.personalInfo?.name || "resume"}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }

    html2pdf()
      .set(opt)
      .from(resumeRef.current)
      .save()
      .then(() => {
        toast.success("Resume downloaded successfully")
      })
      .catch((error) => {
        toast.error("Failed to download resume")
        console.log(error)
      })
  }

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <Card>
        {error}
      </Card>
    )
  }

  if (!currentResume) {
    return (
      <Card>
        <p>No resume found</p>
      </Card>
    )
  }

  //Select the template dynamically

  const TemplateComponent = templates[currentResume.selectedTemplate] || templates.CleanModernResume

  return (
    <div className={classes.singleResumeWrapper}>
      <div ref={resumeRef} className={classes.resumePDFContainer}>
        <TemplateComponent />
      </div>

      <div className={classes.downloadButtonWrapper}>
        <button type='button' onClick={downloadButtonHandler} className={classes.downloadBtn}>Download PDF</button>
      </div>
    </div>
  )
}

export default SingleResume
