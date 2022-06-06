package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Sector.
 */
@Entity
@Table(name = "sector")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sector implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "sector_name")
    private String sectorName;

    @OneToMany(mappedBy = "sector")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "projects", "sector" }, allowSetters = true)
    private Set<Program> programs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "sectors" }, allowSetters = true)
    private Organization organization;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Sector id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSectorName() {
        return this.sectorName;
    }

    public Sector sectorName(String sectorName) {
        this.setSectorName(sectorName);
        return this;
    }

    public void setSectorName(String sectorName) {
        this.sectorName = sectorName;
    }

    public Set<Program> getPrograms() {
        return this.programs;
    }

    public void setPrograms(Set<Program> programs) {
        if (this.programs != null) {
            this.programs.forEach(i -> i.setSector(null));
        }
        if (programs != null) {
            programs.forEach(i -> i.setSector(this));
        }
        this.programs = programs;
    }

    public Sector programs(Set<Program> programs) {
        this.setPrograms(programs);
        return this;
    }

    public Sector addProgram(Program program) {
        this.programs.add(program);
        program.setSector(this);
        return this;
    }

    public Sector removeProgram(Program program) {
        this.programs.remove(program);
        program.setSector(null);
        return this;
    }

    public Organization getOrganization() {
        return this.organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Sector organization(Organization organization) {
        this.setOrganization(organization);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sector)) {
            return false;
        }
        return id != null && id.equals(((Sector) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sector{" +
            "id=" + getId() +
            ", sectorName='" + getSectorName() + "'" +
            "}";
    }
}
