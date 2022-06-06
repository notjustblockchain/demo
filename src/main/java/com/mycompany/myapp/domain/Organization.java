package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "organiztaion_name", nullable = false)
    private String organiztaionName;

    @OneToMany(mappedBy = "organization")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "programs", "organization" }, allowSetters = true)
    private Set<Sector> sectors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Organization id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganiztaionName() {
        return this.organiztaionName;
    }

    public Organization organiztaionName(String organiztaionName) {
        this.setOrganiztaionName(organiztaionName);
        return this;
    }

    public void setOrganiztaionName(String organiztaionName) {
        this.organiztaionName = organiztaionName;
    }

    public Set<Sector> getSectors() {
        return this.sectors;
    }

    public void setSectors(Set<Sector> sectors) {
        if (this.sectors != null) {
            this.sectors.forEach(i -> i.setOrganization(null));
        }
        if (sectors != null) {
            sectors.forEach(i -> i.setOrganization(this));
        }
        this.sectors = sectors;
    }

    public Organization sectors(Set<Sector> sectors) {
        this.setSectors(sectors);
        return this;
    }

    public Organization addSector(Sector sector) {
        this.sectors.add(sector);
        sector.setOrganization(this);
        return this;
    }

    public Organization removeSector(Sector sector) {
        this.sectors.remove(sector);
        sector.setOrganization(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Organization)) {
            return false;
        }
        return id != null && id.equals(((Organization) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Organization{" +
            "id=" + getId() +
            ", organiztaionName='" + getOrganiztaionName() + "'" +
            "}";
    }
}
