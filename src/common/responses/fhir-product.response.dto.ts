import { ApiProperty } from '@nestjs/swagger';

export class ConceptMapTarget {
  @ApiProperty()
  code: string;

  @ApiProperty()
  display: string;

  @ApiProperty()
  equivalence: string;
}

export class ConceptMapElement {
  @ApiProperty()
  code: string;

  @ApiProperty()
  display: string;

  @ApiProperty({ isArray: true })
  target: ConceptMapTarget;
}

export class ConceptGroup {
  @ApiProperty()
  target: string;

  @ApiProperty({ isArray: true })
  element: ConceptMapElement;
}

export class FHIRConceptMap {
  @ApiProperty()
  resourceType: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  version: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  purpose: string;

  @ApiProperty({ isArray: true })
  group: ConceptGroup;
}