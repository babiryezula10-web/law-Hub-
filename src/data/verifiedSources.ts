import { VerifiedSourceMetadata } from '../types';

export const OFFICIAL_UGANDAN_SOURCES = {
  PARLIAMENT: {
    institution: 'Parliament of the Republic of Uganda',
    refPrefix: 'Acts of Parliament / Uganda Gazette',
    authorityType: 'Official Legislative Enactment',
    url: 'https://www.parliament.go.ug'
  },
  ULII: {
    institution: 'Uganda Legal Information Institute (ULII)',
    refPrefix: 'ULII Legal Database',
    authorityType: 'Judicial & Statutory Repository',
    url: 'https://ulii.org'
  },
  JUDICIARY: {
    institution: 'The Judiciary of Uganda (Supreme Court / Court of Appeal / High Court)',
    refPrefix: 'Uganda Law Reports (ULR / UGCC / UGSC / UGHCR)',
    authorityType: 'Judicial Decisions & Practice Directions',
    url: 'https://judiciary.go.ug'
  },
  ULRC: {
    institution: 'Uganda Law Reform Commission (ULRC)',
    refPrefix: 'Consolidated Laws of Uganda / Revised Edition',
    authorityType: 'Statutory Revision & Reform',
    url: 'https://ulrc.go.ug'
  },
  GAZETTE: {
    institution: 'The Uganda Gazette (UPPC - Uganda Printing and Publishing Corporation)',
    refPrefix: 'Official Government Gazette / Statutory Instruments Supplement',
    authorityType: 'Official Promulgation',
    url: 'https://uppc.go.ug'
  },
  MOJCA: {
    institution: 'Ministry of Justice and Constitutional Affairs (MOJCA)',
    refPrefix: 'State Legal Affairs Publication',
    authorityType: 'Constitutional & Legal Administration',
    url: 'https://justice.go.ug'
  }
};

export function createVerifiedSource(
  institutionKey: keyof typeof OFFICIAL_UGANDAN_SOURCES,
  citationRef: string,
  docType: VerifiedSourceMetadata['documentType'],
  pubDate: string,
  versionYear: string = 'Current Consolidated 2025/2026',
  isCurrent: boolean = true,
  status: VerifiedSourceMetadata['verificationStatus'] = 'VERIFIED'
): VerifiedSourceMetadata {
  const inst = OFFICIAL_UGANDAN_SOURCES[institutionKey] || OFFICIAL_UGANDAN_SOURCES.ULII;
  return {
    sourceInstitution: inst.institution,
    sourceRef: `${inst.refPrefix}: ${citationRef}`,
    dateAccessed: 'Verified LawHub Repository Indexing (2025/2026)',
    publicationDate: pubDate,
    versionYear,
    isCurrent,
    documentType: docType,
    verificationStatus: status
  };
}
