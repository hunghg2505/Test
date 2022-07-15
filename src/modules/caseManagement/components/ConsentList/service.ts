import { API_PATH } from 'utils/api/constant';
import { useRequest } from 'ahooks';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import max from 'lodash/max';
import ApiUtils from 'utils/api/api.utils';
import dayjs from 'dayjs';
import { getStatusConstent } from 'modules/dataSubjectManagement/components/Consents/service';

const PAGE_SIZE = 10;

const data = [
  {
    application: 'sc',
    consentName: 'personalised-marketing',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4',
  },
  {
    application: 'sc',
    consentName: 'sharing-mkt',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4',
  },
  {
    application: 'sc',
    consentName: 'sharing-rd',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4',
  },
  {
    application: 'sc',
    consentName: 'direct-marketing',
    content:
      'รับข้อเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย จากบริษัทในกลุ่มซีพี และพันธมิตรทางธุรกิจของเรา ที่วิเคราะห์คัดสรรมาเป็นพิเศษอิงตามความชื่นชอบและพฤติกรรมของคุณ โดยฉันยินยอมให้เอบีซี เปิดเผยข้อมูลส่วนบุคคลของฉันกับบริษัทและพันธมิตรเพื่อวัตถุประสงค์ดังกล่าว',
    title: 'การศึกษาวิเคราะห์ข้อมูลเพื่อการตลาด',
    version: '1.4',
  },
];

const getConsents = async (caseId: string) => {
  const res: any = await ApiUtils.fetch(API_PATH.GET_CASE_CONSENT, {
    caseId,
  });

  const listConsent = res?.content?.data?.map((v: any) => ({
    id: v?.id,
    updatedAt: v?.updatedAt,
    consentData: v?.content,
  }));

  let formatConsents: any = groupBy(listConsent, 'consentData.application');

  formatConsents = Object.keys(formatConsents).map((consentKey, i) => {
    const consents: any[] = formatConsents[consentKey];

    return {
      key: `${consentKey}`,
      dataConsent: {
        name: consentKey,
        lastUpdated: dayjs(max(consents.map((consent) => consent?.updatedAt))).format('DD/MM/YYYY'),
        version: 'V1.0',
        status: i % 2 === 0 ? 'Accepted' : 'Not Accepted',
        description: get(consents, '[0].consentData.title', ''),
        list: consents?.map((consent: any, idx: number) => ({
          id: consent.id,
          title: get(consent, 'consentData.consentName', ''),
          description: get(consent, 'consentData.content', ''),
          value: `${get(consent, 'consentData.consentName', '')}@${consent?.id}`,
          lastUpdated: dayjs(get(consent, 'updatedAt', '')).format('MMM DD, YYYY'),
          version: `Version ${get(consent, 'consentData.version', '')}`,
          status: getStatusConstent(get(consent, 'updatedAt', '')),
        })),
      },
    };
  });

  return {
    total: res?.content?.metadata?.total || 0,
    current: +res?.content?.metadata?.currentPage || 1,
    pageSize: PAGE_SIZE,
    data: formatConsents,
  };
};

const useConsentList = (caseId: string) => {
  const { data, loading } = useRequest(() => getConsents(caseId));

  const onChange = () => {
    console.log();
  };

  return {
    data,
    loading,
    onChange,
  };
};

export { useConsentList };
