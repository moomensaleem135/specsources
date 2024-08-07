import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { ISalesInfo } from '@/lib/types';

import { Separator } from '../ui/seperator';

interface SalesInfoAccordionProps {
  salesInfo: ISalesInfo;
}

const SalesInfoAccordion: React.FC<SalesInfoAccordionProps> = ({
  salesInfo,
}) => {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="focous:outline-0 focus-within:outline-none focus:border-0">
          <div className="w-full ">
            <p className="font-semibold text-left text-headingColor text-lg">
              Sales Info
            </p>
            <p className="font-normal text-left text-subheadingColor text-sm">
              Sales history with and without freight and tax.
            </p>
            <Separator className="my-4" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-12 gap-y-6 ">
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4 ">
                  <p className="font-semibold text-left text-headingColor text-base">
                    Sales (with Freight and Tax):
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 border-b-2 border-b-border">
                  <div className="flex justify-between">
                    <p className="font-semibold text-left text-primary text-base">
                      Average Sales:
                    </p>
                    <p className="font-medium text-right text-headingColor text-lg">
                      ${' '}
                      {salesInfo.average_sales_with_freight_and_tax?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 border-b-2 border-b-border">
                  <div className="flex justify-between">
                    <p className="font-semibold text-left text-primary text-base">
                      Total Sales:
                    </p>
                    <p className="font-medium text-right text-headingColor text-lg">
                      $ {salesInfo.total_sales_with_freight_and_tax?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4  ">
                  <p className="font-semibold text-left text-headingColor text-base">
                    Sales (without Freight and Tax):
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 border-b-2 border-b-border">
                  <div className="flex justify-between">
                    <p className="font-semibold text-left text-primary text-base">
                      Average Sales:
                    </p>
                    <p className="font-medium text-right text-headingColor text-lg">
                      ${' '}
                      {salesInfo.average_sales_without_freight_and_tax?.toFixed(
                        2
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 border-b-2 border-b-border">
                  <div className="flex justify-between">
                    <p className="font-semibold text-left text-primary text-base">
                      Total Sales:
                    </p>
                    <p className="font-medium text-right text-headingColor text-lg">
                      ${' '}
                      {salesInfo.total_sales_without_freight_and_tax?.toFixed(
                        2
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SalesInfoAccordion;
