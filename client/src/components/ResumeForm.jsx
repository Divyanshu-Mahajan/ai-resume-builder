import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import classes from './ResumeForm.module.css';
import { TiDelete } from "react-icons/ti";
import { updatePersonalInfo, updateSummary, addEducation, removeEducation, addExperience, removeExperience, addSkill, removeSkill, addProject, addCertification, removeProject, removeCertification, resetResume, removeProjectDescription, createResume, fetchSingleResume, updateResume, generateSummary, generateJobResponsibility, generateEducationDescription, generateProjectDescription } from '../redux/slice/resumeSlice';
import { toggleTheme } from '../redux/theme/themeSlice';
import { toast } from 'react-toastify';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
const ResumeForm = () => {


  const { id } = useParams(); //if id exists then edit the resume
  const dispatch = useDispatch();
  const personalInfo = useSelector(state => state.resume.personalInfo);
  const summary = useSelector(state => state.resume.summary);
  const educationList = useSelector(state => state.resume.education);
  const experienceList = useSelector(state => state.resume.experience);
  const skillList = useSelector(state => state.resume.skills);
  const projectList = useSelector(state => state.resume.projects);
  const certificationList = useSelector(state => state.resume.certification);

  const selectedTemplate = useSelector(state => state?.resume?.selectedTemplate);


  const darkMode = useSelector(state => state.theme.darkMode);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userLinkedIn, setUserLinkedIn] = useState('');
  const [userGithub, setUserGithub] = useState('');
  const [userSummary, setUserSummary] = useState('');

  const [generateWithAI, setGenerateWithAI] = useState(false);

  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingAIEducation, setLoadingAIEducation] = useState(false);
  const [loadingAIProject, setLoadingAIProject] = useState(false);

  //Fetch resume if edit the existed resume
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleResume(id));
    }
  }, [id, dispatch]);

  // Sync Redux

  useEffect(() => {
    setUserName(personalInfo?.name || "");
    setUserEmail(personalInfo?.email || "");
    setUserPhone(personalInfo?.phone || "");
    setUserAddress(personalInfo?.address || "");
    setUserLinkedIn(personalInfo?.linkedin || "");
    setUserGithub(personalInfo?.github || "");
    setUserSummary(summary || '')
  }, [personalInfo, summary])

  const [education, setEducation] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    grade: '',
    descriptions: ['']
  })
  const [experience, setExperience] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    location: '',
    responsibilities: ['']
  });
  const [skill, setSkill] = useState('');
  const [project, setProject] = useState({
    projectTitle: '',
    technologies: '',
    descriptions: [''],
    url: ''
  });
  const [certification, setCertification] = useState({
    title: '',
    issuer: '',
    date: '',
    url: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const resumeFormSubmitHandler = (event) => {
    event.preventDefault();

    const name = personalInfo.name.trim();
    const email = personalInfo.email.trim();
    const phone = personalInfo.phone.trim();

    if (!name) {
      setError("Name is Required");
      toast.error("Name is Required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid Email");
      toast.error("Invalid Email")
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Invalid phone number");
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    const resumeData = {
      personalInfo,
      summary,
      education: educationList,
      experience: experienceList,
      skills: skillList,
      projects: projectList,
      certification: certificationList,
      selectedTemplate
    }

    if (id) {
      //Update the resume

      dispatch(updateResume({ id, updates: resumeData }))
        .unwrap()
        .then(() => {
          toast.success('Resume updated successfully!');
          navigate('/dashboard/my-resume');
        })
        .catch(error => {
          toast.error(error?.message || "Failed to update resume");
        })
    } else {
      dispatch(createResume(resumeData))
        .unwrap()
        .then(() => {
          toast.success("Resume Form submitted successfully!");
          setError('');
          navigate('/dashboard/my-resume');
          clearForm();
        })
        .catch(error => {
          toast.error(error?.message || "Failed to create new resume");
        })
    }

  }

  const nameChangeHandler = (event) => {
    setUserName(event.target.value);
    dispatch(
      updatePersonalInfo({
        name: event.target.value
      })
    )
  }

  const emailChangeHandler = (event) => {
    setUserEmail(event.target.value);
    dispatch(updatePersonalInfo({
      email: event.target.value
    }))
  }

  const phoneChangeHandler = (event) => {
    setUserPhone(event.target.value);
    dispatch(updatePersonalInfo({
      phone: event.target.value
    }))
  }

  const addressChangeHandler = (event) => {
    setUserAddress(event.target.value);
    dispatch(updatePersonalInfo({
      address: event.target.value
    }))
  }

  const linkedinChangeHandler = (event) => {
    setUserLinkedIn(event.target.value);
    dispatch(updatePersonalInfo({
      linkedin: event.target.value
    }))
  }

  const githubChangeHandler = (event) => {
    setUserGithub(event.target.value);
    dispatch(updatePersonalInfo({
      github: event.target.value
    }))
  }

  const summaryChangeHandler = (event) => {
    setUserSummary(event.target.value);
    dispatch(updateSummary(event.target.value));
  }

  //Generate summary with the help of AI
  const generateSummaryHandler = () => {
    let summaryData;

    if (experienceList.length > 0 && experienceList[0]?.jobTitle && skillList.length > 0) {
      const jobExp = experienceList[0].jobTitle;
      const skillExp = skillList.join(", ");
      summaryData = {
        text: `${jobExp} with skills in ${skillExp}`
      };
    }

    if (!summaryData) {
      toast.error("Please add at least one job title and one skill before generating.");
      return;
    }

    setGenerateWithAI(true);

    dispatch(generateSummary(summaryData))
      .unwrap()
      .then((aiSummary) => {
        // direct summary string from thunk
        dispatch(updateSummary(aiSummary));
        toast.success("AI summary generated!");
      })
      .catch(error => {
        toast.error(error || "Failed to generate AI summary");
      })
  };


  const addDescription = () => {
    setEducation(prev => ({
      ...prev,
      descriptions: [...prev.descriptions, '']
    }))
  }

  const removeDescription = (index) => {
    setEducation(prev => ({
      ...prev,
      descriptions: prev.descriptions.filter((_, i) => i !== index)
    }))
  }

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...education.descriptions];
    newDescriptions[index] = value;
    setEducation({
      ...education,
      descriptions: newDescriptions
    })
  }
  const educationChangeHandler = (event) => {
    const { name, value } = event.target;
    setEducation(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const addEducationHandler = (event) => {
    event.preventDefault();

    // Check if required fields are filled
    if (!education.degree.trim() || !education.institution.trim()) return;

    // Filter out empty descriptions
    const nonEmptyDescriptions = education.descriptions.filter(desc => desc.trim() !== '');

    dispatch(addEducation({
      ...education,
      descriptions: nonEmptyDescriptions.length ? nonEmptyDescriptions : ['']
    }));

    // Reset form
    setEducation({
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      grade: '',
      descriptions: ['']
    });
  };

  const generateAIEducationDescriptionHandler = async () => {
    if (!education.degree.trim() || !education.institution.trim()) return;
    setLoadingAIEducation(true);
    try {
      const response = await dispatch(
        generateEducationDescription({
          degree: education.degree.trim(),
          institution: education.institution.trim()
        })
      )
        .unwrap()

      setEducation(prev => ({
        ...prev,
        descriptions: response
      }))
      toast.success("AI generate descriptions")
    } catch (error) {
      toast.error(error || "Failed to generate descriptions")
    } finally {
      setLoadingAIEducation(false)
    }
  }

  const addResponsibility = () => {
    setExperience(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, '']
    }))
  }

  const removeResponsibility = (index) => {
    setExperience(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }))
  }

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...experience.responsibilities];
    newResponsibilities[index] = value
    setExperience({
      ...experience,
      responsibilities: newResponsibilities
    })
  }


  const generateResponsibilitiesHandler = async () => {
    if (!experience.jobTitle.trim() || !experience.company.trim()) return;
    setLoadingAI(true);
    try {
      const res = await dispatch(
        generateJobResponsibility({
          jobTitle: experience.jobTitle,
          company: experience.company
        }))
        .unwrap();
      setExperience(prev => ({ 
        ...prev, 
        responsibilities: res 
      }));
      toast.success("AI responsibilities generated!");
    } catch (error) {
      toast.error(error || "Failed to generate responsibilities");
    } finally {
      setLoadingAI(false);
    }
  }

  const experienceChangeHandler = (event) => {
    const { name, value } = event.target;
    setExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addExperienceHandler = (event) => {
    event.preventDefault();

    // Check if required fields are filled
    if (!experience.jobTitle.trim() || !experience.company.trim()) return;

    // Filter out empty responsibilities
    const nonEmptyResponsibilities = experience.responsibilities.filter(resp => resp.trim() !== '');

    dispatch(addExperience({
      ...experience,
      responsibilities: nonEmptyResponsibilities.length ? nonEmptyResponsibilities : ['']
    }));

    // Reset form
    setExperience({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: ['']
    });
  };

  const skillChangeHandler = (event) => {
    setSkill(event.target.value);
  }

  const generateProjectDescriptionHandler = async () => {
    if (!project.projectTitle.trim() || !project.technologies.trim()) return;
    setLoadingAIProject(true);
    console.log(project.projectTitle)
    try {
      const res = await dispatch(
        generateProjectDescription({
          projectTitle: project.projectTitle,
          technologies: project.technologies
        })
      )
        .unwrap()

      setProject(prev => ({
        ...prev,
        descriptions: res
      }))
      toast.success("AI generates project description successfully")
    } catch (error) {
      toast.error(error || "Failed to generate project description")
    } finally {
      setLoadingAIProject(false)
    }
  }
  const addSkillHandler = (event) => {
    event.preventDefault();

    if (skill.trim() === '') return;

    dispatch(addSkill(skill));
    setSkill('');
  }

  const addProjectDescription = () => {
    setProject(prev => ({
      ...prev,
      descriptions: [...prev.descriptions, '']
    }));
  };

  const removeProjectDescription = (index) => {
    setProject(prev => ({
      ...prev,
      descriptions: prev.descriptions.filter((_, i) => i !== index)
    }));
  };

  const handleProjectDescriptionChange = (index, value) => {
    const newDescriptions = [...project.descriptions];
    newDescriptions[index] = value;
    setProject({ ...project, descriptions: newDescriptions });
  };

  const projectChangeHandler = (event) => {
    const { name, value } = event.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addProjectHandler = (event) => {
    event.preventDefault();

    // Check if required field is filled
    if (!project.projectTitle.trim()) return;

    // Filter out empty descriptions
    const nonEmptyDescriptions = project.descriptions.filter(desc => desc.trim() !== '');

    dispatch(addProject({
      ...project,
      descriptions: nonEmptyDescriptions.length ? nonEmptyDescriptions : ['']
    }));

    // Reset form
    setProject({
      projectTitle: '',
      technologies: '',
      descriptions: [''],
      url: ''
    });
  };

  const certificationChangeHandler = (event) => {
    const { name, value } = event.target;
    setCertification(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addCertificationHandler = (event) => {
    event.preventDefault();

    if (!certification.title.trim() === '') return;

    dispatch(addCertification(certification));
    setCertification({
      title: '',
      issuer: '',
      date: '',
      url: ''
    });
  }

  // Add this function inside your component:
  const clearForm = () => {
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserAddress('');
    setUserLinkedIn('');
    setUserGithub('');
    setUserSummary('');
    setEducation({
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      grade: '',
      descriptions: ['']
    });
    setExperience({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: ['']
    });
    setSkill('');
    setProject({
      projectTitle: '',
      technologies: '',
      descriptions: [''],
      url: ''
    });
    setCertification({
      title: '',
      issuer: '',
      date: '',
      url: ''
    });
  };

  const previewResumeHandler = () => {
    if (!selectedTemplate) {
      navigate("/preview");
    } else {
      navigate(`/templates/${selectedTemplate}`);
    }
  }
  return (
    <div className={classes.resumeForm}>
      <header className={classes.header}>
        <h2 className={classes.heading}>Resume Form</h2>
        <button className={classes.toggleBtn} onClick={() => dispatch(toggleTheme())}>
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </header>

      <form className={classes.form} onSubmit={resumeFormSubmitHandler}>
        <section className={classes.formPersonalInfo}>
          <div className={classes.nameField}>
            <label htmlFor='fullName'>Full Name</label>
            <input
              type='text'
              id='fullName'
              value={userName}
              onChange={nameChangeHandler} />

            {
              error && (error === 'Name is Required' && (
                <p className={classes.error}>{error}</p>
              ))
            }
          </div>

          <div className={classes.emailField}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' value={userEmail} onChange={emailChangeHandler} />

            {
              error && (error === "Invalid Email") && (
                <p className={classes.error}>{error}</p>
              )
            }
          </div>
          <div className={classes.phoneField}>
            <label htmlFor='phone'>Phone</label>
            <input type='text' id='phone' value={userPhone} onChange={phoneChangeHandler} />

            {
              error && (error === 'Invalid phone number') && (
                <p className={classes.error}>{error}</p>
              )
            }
          </div>
          <div className={classes.addressField}>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' value={userAddress} onChange={addressChangeHandler} />
          </div>
          <div className={classes.linkedinField}>
            <label htmlFor='linkedIn'>LinkedIn</label>
            <input type='text' id='linkedIn' value={userLinkedIn} onChange={linkedinChangeHandler} />
          </div>
          <div className={classes.field}>
            <label htmlFor='github'>Github</label>
            <input type='text' id='github' value={userGithub} onChange={githubChangeHandler} />
          </div>
        </section>
        <section className={classes.summaryInfo}>
          <div className={classes.summary}>
            <label htmlFor='summary'>Summary</label>
            <textarea id='summary' rows={5} cols={30} value={userSummary} onChange={summaryChangeHandler} />
          </div>

          <button
            type='button'
            className={classes.button}
            onClick={generateSummaryHandler}
          >{generateWithAI ? "Generating..." : "Generate with AI"}</button>
        </section>

        <section className={classes.educationInfo}>
          <div className={classes.education}>
            <label htmlFor='degree'>Degree</label>
            <input
              type='text'
              id='degree'
              name='degree'
              value={education.degree}
              onChange={educationChangeHandler}
              placeholder="e.g. B.Sc Computer Science"
            />
            <label htmlFor='institution'>Institution</label>
            <input
              type='text'
              id='institution'
              name='institution'
              value={education.institution}
              onChange={educationChangeHandler}
              placeholder="e.g. University Name"
            />

            {/* Education Description button */}
            {
              education.degree.trim() && education.institution.trim() && (
                <button
                  type='button'
                  className={classes.button}
                  onClick={generateAIEducationDescriptionHandler}
                  disabled={loadingAIEducation}>
                  {loadingAIEducation ? "Generating..." : "Generate Description with AI"}
                </button>
              )
            }
            <label htmlFor='startDate'>Start Date</label>
            <input
              type='text'
              id='startDate'
              name='startDate'
              value={education.startDate}
              onChange={educationChangeHandler}
              placeholder="e.g. 2020"
            />
            <label htmlFor='endDate'>End Date</label>
            <input
              type='text'
              id='endDate'
              name='endDate'
              value={education.endDate}
              onChange={educationChangeHandler}
              placeholder="e.g. 2023"
            />
            <label htmlFor='grade'>Grade</label>
            <input
              type='text'
              id='grade'
              name='grade'
              value={education.grade}
              onChange={educationChangeHandler}
              placeholder="e.g. 8.5 CGPA"
            />

            <label>Descriptions</label>
            {education.descriptions.map((desc, index) => (
              <div key={index} className={classes.descriptionItem}>
                <input
                  type='text'
                  value={desc}
                  onChange={(event) => handleDescriptionChange(index, event.target.value)}
                  placeholder="e.g. Relevant coursework, achievements"
                />
                <button
                  type='button'
                  onClick={() => removeDescription(index)}
                  disabled={education.descriptions.length <= 1}
                  className={classes.removeDescriptionBtn}
                >
                  <TiDelete />
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={addDescription}
              className={classes.addDescriptionBtn}
            >
              Add Description
            </button>
            <button type='button' onClick={addEducationHandler}>Add Education</button>
          </div>

          <ul className={classes.educationList}>
            {educationList.map((edu, index) => (
              <li key={index} className={classes.educationItem}>
                <strong>{edu.degree}</strong> at {edu.institution} ({edu.startDate} - {edu.endDate})<br />
                Grade: {edu.grade}<br />
                <ul className={classes.descriptionList}>
                  {edu.descriptions.map((desc, i) => (
                    <li key={i} className={classes.descriptionItem}>
                      {desc}
                    </li>

                  ))}
                </ul>
                <button type='button' className={classes.deleteBtn} onClick={() => dispatch(removeEducation(index))}><TiDelete /></button>
              </li>
            ))}
          </ul>
        </section>

        <section className={classes.experienceInfo}>
          <div className={classes.experience}>
            <label htmlFor='jobTitle'>Job Title</label>
            <input
              type='text'
              id='jobTitle'
              name='jobTitle'
              value={experience.jobTitle}
              onChange={experienceChangeHandler}
              placeholder="e.g. Junior Developer" />
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              id='company'
              name='company'
              value={experience.company}
              onChange={experienceChangeHandler}
              placeholder="e.g. Infosys" />

            {/* AI Suggestion Button */}
            {experience.jobTitle.trim() && experience.company.trim() && (
              <button type='button' className={classes.button} onClick={generateResponsibilitiesHandler} disabled={loadingAI}>
                {loadingAI ? "Generating..." : "Generate Responsibilities with AI"}
              </button>
            )}

            <label htmlFor='startDate'>Start Date</label>
            <input
              type='text'
              id='startDate'
              name='startDate'
              value={experience.startDate}
              onChange={experienceChangeHandler}
              placeholder="e.g. 2021" />
            <label htmlFor='endDate'>End Date</label>
            <input
              type='text'
              id='endDate'
              name='endDate'
              value={experience.endDate}
              onChange={experienceChangeHandler}
              placeholder="e.g. 2023" />
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              id='location'
              name='location'
              value={experience.location}
              onChange={experienceChangeHandler}
              placeholder="e.g. Mohali" />

            <label>Responsibilities</label>

            {
              experience.responsibilities.map((resp, index) => (
                <div key={index} className={classes.responsibilityItem}>
                  <input
                    type='text'
                    value={resp}
                    placeholder="e.g. Developed new features"
                    onChange={(event) => handleResponsibilityChange(index, event.target.value)} />
                  <button
                    type='button'
                    onClick={() => removeResponsibility(index)}
                    disabled={experience.responsibilities.length <= 1}
                    className={classes.removeResponsibilityBtn}>
                    <TiDelete />
                  </button>
                </div>
              ))
            }
            <button
              type='button'
              onClick={addResponsibility}
              className={classes.addResponsibilityBtn}
            >
              Add Responsibility
            </button>

            <button type='button' onClick={addExperienceHandler}>Add Experience</button>
          </div>
          <ul className={classes.experienceList}>
            {experienceList.map((exp, index) => (
              <li key={index} className={classes.experienceItem}>
                <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.startDate} - {exp.endDate})<br />
                {exp.location}<br />

                <ul className={classes.responsibilitiesList}>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>
                      {resp}
                    </li>
                  ))}
                </ul>

                <button type='button' className={classes.deleteBtn} onClick={() => dispatch(removeExperience(index))}><TiDelete /></button>
              </li>
            ))}
          </ul>
        </section>


        <section className={classes.skillsInfo}>
          <div className={classes.skills}>
            <label htmlFor='skill'>Skills</label>
            <input type='text' id='skill' value={skill} onChange={skillChangeHandler} />
            <button type='button' onClick={addSkillHandler}>Add</button>
          </div>

          <ul className={classes.skillList}>
            {
              skillList.map((skill, index) => (
                <li key={index} className={classes.skillItem}>
                  {skill}
                  <button type='button' className={classes.deleteBtn} onClick={() => dispatch(removeSkill(index))}><TiDelete /></button>
                </li>
              ))
            }
          </ul>
        </section>

        <section className={classes.projectsInfo}>
          <div className={classes.project}>
            <label htmlFor='projectTitle'>Project Title</label>
            <input
              placeholder="e.g. Ecommerce"
              type='text'
              id='projectTitle'
              name='projectTitle'
              value={project.projectTitle}
              onChange={projectChangeHandler} />
            <label htmlFor='technologies'>Technologies</label>
            <input
              placeholder='e.g. React, Express, Node...'
              type='text'
              id='technologies'
              name='technologies'
              value={project.technologies}
              onChange={projectChangeHandler} />

            {/* AI project description button */}
            {
              project.projectTitle.trim() && project.technologies.trim() && (
                <button
                  type='button'
                  className={classes.button}
                  onClick={generateProjectDescriptionHandler}
                  disabled={loadingAIProject}>
                  {loadingAIProject ? "Generating..." : "Generate Project description with AI"}
                </button>
              )
            }

            <label>Description</label>
            {project.descriptions.map((desc, index) => (
              <div key={index} className={classes.descriptionItem}>
                <input
                  type='text'
                  value={desc}
                  onChange={(event) => handleProjectDescriptionChange(index, event.target.value)}
                  placeholder="e.g. Project details" />
                <button
                  type='button'
                  disabled={project.descriptions.length <= 1}
                  onClick={() => removeProjectDescription(index)}
                  className={classes.removeDescriptionBtn}>
                  <TiDelete />
                </button>
              </div>
            ))}

            <button
              type='button'
              onClick={addProjectDescription}
              className={classes.addDescriptionBtn}
            >
              Add Description
            </button>

            <label htmlFor='url'>URL</label>
            <input
              placeholder='https://github/username.git'
              type='text'
              id='url'
              name='url'
              value={project.url}
              onChange={projectChangeHandler} />
            <button type='button' onClick={addProjectHandler}>Add</button>
          </div>
          <ul className={classes.projectList}>
            {projectList.map((proj, index) => (
              <li key={index} className={classes.projectItem}>
                <strong>{proj.projectTitle}</strong> ({proj.technologies})<br />

                <ul className={classes.descriptionsList}>
                  {proj.descriptions.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>

                {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer">{proj.url}</a>}
                <button type='button' className={classes.deleteBtn} onClick={() => dispatch(removeProject(index))}><TiDelete /></button>
              </li>
            ))}
          </ul>
        </section>

        <section className={classes.certificationInfo}>
          <div className={classes.certification}>
            <label htmlFor='title'>Title</label>
            <input
              placeholder='e.g. certificate title'
              type='text'
              id='title'
              name='title'
              value={certification.title}
              onChange={certificationChangeHandler} />
            <label htmlFor='issuer'>Issuer</label>
            <input
              placeholder='e.g. Issuer name'
              type='text'
              id='issuer'
              name='issuer'
              value={certification.issuer}
              onChange={certificationChangeHandler} />
            <label htmlFor='date'>Date</label>
            <input
              placeholder='e.g. 2023'
              type='text'
              id='date'
              name='date'
              value={certification.date}
              onChange={certificationChangeHandler} />
            <label htmlFor='url'>URL</label>
            <input
              placeholder='https://certificate.com'
              type='text'
              id='url'
              name='url'
              value={certification.url}
              onChange={certificationChangeHandler} />
            <button type='button' onClick={addCertificationHandler}>Add</button>
          </div>
          <ul className={classes.certificationList}>
            {certificationList.map((certi, index) => (
              <li key={index} className={classes.certificationItem}>
                <strong>{certi.title}</strong> by {certi.issuer} ({certi.date})<br />
                {certi.url && <a href={certi.url} target="_blank" rel="noopener noreferrer">{certi.url}</a>}
                <button type='button' className={classes.deleteBtn} onClick={() => dispatch(removeCertification(index))}><TiDelete /></button>
              </li>
            ))}
          </ul>
        </section>

        <div className={classes.button}>
          <button type='submit'>Submit</button>
          <button type='button' onClick={() => { dispatch(resetResume()); clearForm() }}>Clear Form</button>
          <button type='button' onClick={previewResumeHandler}>Preview Resume</button>
        </div>
      </form>
    </div>
  )
}

export default ResumeForm


