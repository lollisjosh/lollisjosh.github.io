import './Skills.css'

import Layout from '../components/Layout'
import WakaTimePieChart from '../components/WakaTimePieChart'
import { wakatimeChartSources } from '../data/wakatimeCharts'

const softSkillCategories = [
    {
        title: 'Project Management',
        skills: ['Agile/Scrum', 'Kanban Workflows', 'Daily Standups', 'Git/GitHub'],
    },
    {
        title: 'Professional Traits',
        skills: ['Self-Motivated', 'Detail Oriented', 'Leadership', 'Team Collaboration'],
    },
]

const technicalCompetencyCategories = [
    {
        title: 'Game Development',
        skills: ['Unity Engine', 'SFML/Box2D', 'OpenGL', 'Win32 API'],
    },
    {
        title: 'Development Tools',
        skills: ['CMake', 'Dear ImGui', 'OOP Patterns', 'Build Systems'],
    },
    {
        title: 'Creative Software',
        skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere', '3ds Max/Blender'],
    },
]

function SkillCategory({ title, skills }) {
    return (
        <article className="skill-card">
            <h3>{title}</h3>

            <ul>
                {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
        </article>
    )
}

function ChartPanel({ source, ariaLabel }) {
    return (
        <div className="skills-chart-panel">
            <h3>{source.title}</h3>

            <div className="skills-chart-panel__canvas">
                <WakaTimePieChart source={source} ariaLabel={ariaLabel} />
            </div>
        </div>
    )
}

function Skills() {
    return (
        <Layout>
            <main className="skills-page">
                <section className="skills-hero">
                    <p className="skills-hero__eyebrow">Technical Profile</p>

                    <h1>Skills</h1>

                    <p>
                        A snapshot of my technical background, development tools, creative software experience, and tracked coding activity.
                    </p>
                </section>

                <nav className="skills-toc" aria-label="Skills page sections">
                    <a href="#technical-proficiency">Technical Proficiency</a>
                    <a href="#soft-skills">Soft Skills</a>
                    <a href="#technical-competencies">Technical Competencies</a>
                </nav>

                <section
                    className="skills-section skills-section--charts"
                    id="technical-proficiency">
                    <div className="skills-section__header">
                        <p className="skills-section__eyebrow">WakaTime</p>

                        <h2>Technical Proficiency</h2>
                        <p>
                            WakaTime activity from 2023 to present. These charts show verified
                            tracked sessions where WakaTime was installed and active, not a
                            complete history of my programming work.
                        </p>
                    </div>

                    <div className="skills-chart-note" role="note">
                        <p>
                            I have been programming for 10+ years. Earlier work and untracked
                            setups are excluded from these charts.
                        </p>
                    </div>

                    <div className="skills-charts skills-charts--desktop">
                        <section className="skills-chart-group" aria-labelledby="desktop-languages-heading">
                            <div className="skills-chart-group__header">
                                <h3 id="desktop-languages-heading">Languages Used</h3>
                                <p>Hover a slice of pie for language data.</p>
                            </div>

                            <div className="skills-chart-row">
                                <ChartPanel
                                    source={wakatimeChartSources.languagesThirtyDays}
                                    ariaLabel="Past 30 days WakaTime language usage pie chart"
                                />
                                <ChartPanel
                                    source={wakatimeChartSources.languagesAllTime}
                                    ariaLabel="All time WakaTime language usage pie chart"
                                />
                            </div>
                        </section>

                        <section className="skills-chart-group" aria-labelledby="desktop-editors-heading">
                            <div className="skills-chart-group__header">
                                <h3 id="desktop-editors-heading">Editors Used</h3>
                                <p>Hover a slice of pie for editor data.</p>
                            </div>

                            <div className="skills-chart-row">
                                <ChartPanel
                                    source={wakatimeChartSources.editorsThirtyDays}
                                    ariaLabel="Past 30 days WakaTime editor usage pie chart"
                                />
                                <ChartPanel
                                    source={wakatimeChartSources.editorsAllTime}
                                    ariaLabel="All time WakaTime editor usage pie chart"
                                />
                            </div>
                        </section>
                    </div>

                    <div className="skills-charts skills-charts--mobile">
                        <section className="skills-chart-group" aria-labelledby="mobile-languages-heading">
                            <div className="skills-chart-group__header">
                                <h3 id="mobile-languages-heading">Languages Used</h3>
                                <p>Tap a slice of pie for language data.</p>
                            </div>

                            <ChartPanel
                                source={wakatimeChartSources.languagesThirtyDays}
                                ariaLabel="Past 30 days WakaTime language usage pie chart"
                            />
                            <ChartPanel
                                source={wakatimeChartSources.languagesAllTime}
                                ariaLabel="All time WakaTime language usage pie chart"
                            />
                        </section>

                        <section className="skills-chart-group" aria-labelledby="mobile-editors-heading">
                            <div className="skills-chart-group__header">
                                <h3 id="mobile-editors-heading">Editors Used</h3>
                                <p>Tap a slice of pie for editor data.</p>
                            </div>

                            <ChartPanel
                                source={wakatimeChartSources.editorsThirtyDays}
                                ariaLabel="Past 30 days WakaTime editor usage pie chart"
                            />
                            <ChartPanel
                                source={wakatimeChartSources.editorsAllTime}
                                ariaLabel="All time WakaTime editor usage pie chart"
                            />
                        </section>
                    </div>
                </section>

                <section className="skills-section" id="soft-skills">
                    <div className="skills-section__header">
                        <p className="skills-section__eyebrow">Collaboration</p>

                        <h2>Soft Skills</h2>
                    </div>

                    <div className="skills-grid">
                        {softSkillCategories.map((category) => (
                            <SkillCategory key={category.title} {...category} />
                        ))}
                    </div>
                </section>

                <section className="skills-section" id="technical-competencies">
                    <div className="skills-section__header">
                        <p className="skills-section__eyebrow">Applied Tools</p>

                        <h2>Technical Competencies</h2>
                    </div>

                    <div className="skills-grid">
                        {technicalCompetencyCategories.map((category) => (
                            <SkillCategory key={category.title} {...category} />
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default Skills
