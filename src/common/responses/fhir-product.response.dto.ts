import { ApiProperty } from '@nestjs/swagger';
import { R4 } from '@ahryman40k/ts-fhir-types';

export class FhirProductResponse {
  @ApiProperty()
  resourceType: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  version: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  experimental: boolean;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  contact: R4.IContactDetail;

  @ApiProperty()
  description: string;

  @ApiProperty()
  useContext: R4.IUsageContext[];

  @ApiProperty()
  purpose: string;

  @ApiProperty()
  copyright: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  target: string;

  @ApiProperty()
  group: R4.IConceptMap_Group[];
}
