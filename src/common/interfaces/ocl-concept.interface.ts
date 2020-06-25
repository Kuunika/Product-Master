export interface OclConcept {
    type:               string;
    uuid:               string;
    id:                 string;
    external_id:        string;
    concept_class:      string;
    datatype:           string;
    display_name:       string;
    display_locale:     string;
    names:              Name[];
    descriptions:       Description[];
    retired:            boolean;
    source:             string;
    source_url:         string;
    owner:              string;
    owner_type:         string;
    owner_url:          string;
    version:            string;
    created_on:         string;
    updated_on:         string;
    version_created_on: string;
    version_created_by: string;
    extras:             Extras;
    mappings:           Mapping[];
    is_latest_version:  boolean;
    locale:             string;
    version_url:        string;
    url:                string;
}

export interface Description {
    uuid:             string;
    external_id:      string;
    description:      string;
    locale:           string;
    locale_preferred: boolean;
    description_type: string;
    type:             string;
}

export interface Extras {
    "Attribute ID": string;
    "Category ID":  string;
}

export interface Mapping {
    external_id:      string;
    retired:          boolean;
    map_type:         string;
    source:           string;
    owner:            string;
    owner_type:       string;
    from_concept_url: string;
    to_concept_url:   string;
    to_source_url:    string;
    to_concept_code:  string;
    to_concept_name:  string;
    url:              string;
}

export interface Name {
    uuid:             string;
    external_id:      string;
    name:             string;
    locale:           string;
    locale_preferred: boolean;
    name_type:        string;
    type:             string;
}
