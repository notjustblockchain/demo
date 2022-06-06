package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Program.
 */
@Entity
@Table(name = "program")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Program implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "program_nane")
    private String programNane;

    @Column(name = "sponser")
    private String sponser;

    @OneToMany(mappedBy = "program")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "program" }, allowSetters = true)
    private Set<Project> projects = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "programs", "organization" }, allowSetters = true)
    private Sector sector;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Program id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProgramNane() {
        return this.programNane;
    }

    public Program programNane(String programNane) {
        this.setProgramNane(programNane);
        return this;
    }

    public void setProgramNane(String programNane) {
        this.programNane = programNane;
    }

    public String getSponser() {
        return this.sponser;
    }

    public Program sponser(String sponser) {
        this.setSponser(sponser);
        return this;
    }

    public void setSponser(String sponser) {
        this.sponser = sponser;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<Project> projects) {
        if (this.projects != null) {
            this.projects.forEach(i -> i.setProgram(null));
        }
        if (projects != null) {
            projects.forEach(i -> i.setProgram(this));
        }
        this.projects = projects;
    }

    public Program projects(Set<Project> projects) {
        this.setProjects(projects);
        return this;
    }

    public Program addProject(Project project) {
        this.projects.add(project);
        project.setProgram(this);
        return this;
    }

    public Program removeProject(Project project) {
        this.projects.remove(project);
        project.setProgram(null);
        return this;
    }

    public Sector getSector() {
        return this.sector;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    public Program sector(Sector sector) {
        this.setSector(sector);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Program)) {
            return false;
        }
        return id != null && id.equals(((Program) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Program{" +
            "id=" + getId() +
            ", programNane='" + getProgramNane() + "'" +
            ", sponser='" + getSponser() + "'" +
            "}";
    }
}
