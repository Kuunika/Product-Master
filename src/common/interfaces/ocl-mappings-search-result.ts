export interface OclMappingsSearchResult {
  external_id: string;
  retired: boolean;
  map_type: string;
  source: string;
  owner: string;
  owner_type: string;
  from_concept_code: string;
  from_concept_name: string;
  from_concept_url: string;
  to_concept_url: string;
  to_source_url: string;
  to_concept_code: string;
  to_concept_name: string;
  url: string;
  version: string;
  id: string;
  versioned_object_id: string;
  from_source_owner: string;
  from_source_owner_type: string;
  from_source_name: string;
  from_source_url: string;
  to_source_owner: string;
  to_source_owner_type: string;
  to_source_name: string;
  versioned_object_url: string;
  is_latest_version: boolean;
  update_comment: null;
  version_url: string;
}