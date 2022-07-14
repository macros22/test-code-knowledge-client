import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const getQueryParametr = (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,  parametrStr: string) => {
  let parametr: string | string[] | null = context.query[parametrStr] || null;

	if (Array.isArray(parametr)) {
		return parametr[0];
	} else {
    return parametr;
  }

}