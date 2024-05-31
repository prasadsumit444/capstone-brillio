import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
 
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 12,
    padding: 12,
    borderBottom: "1px solid #e4e4e4",
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    color: "#3182CE",
  },
  text: {
    fontSize: 12,
    color: "#4A4A4A",
  },
  boldText: {
    fontSize: 12,
    color: "#4A4A4A",
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    color: "#3182CE",
  },
  logo: {
    width: 50,
    height: 50,
  },
  sectionHeader: {
    fontSize: 14,
    color: "#4A4A4A",
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 4,
  },
  accountSummary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  charges: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
 
const InvoicePdf = ({ invoiceData }) => {
  const tax = invoiceData.billAmount * 0.18;
  const monthlyRentals = invoiceData.billAmount - tax;
 
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>MOBILE SERVICES</Text>
            <Text style={styles.text}>Original Copy for Recipient - Tax Invoice</Text>
          </View>
          <View>
            <Image
              src="https://w7.pngwing.com/pngs/390/389/png-transparent-airtel.png"
              style={styles.logo}
            />
            <Text style={styles.boldText}>Invoice ID: {invoiceData?.invoiceId}</Text>
          </View>
        </View>
 
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Customer Details</Text>
          <Text style={styles.text}>Full Name: {invoiceData?.fullName}</Text>
          <Text style={styles.text}>Address: {invoiceData?.address}</Text>
        </View>
 
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Invoice Details</Text>
          <Text style={styles.text}>
            Billing Period: {invoiceData?.startDate} to {invoiceData?.endDate}
          </Text>
          <Text style={styles.boldText}>Payment Due Date: {invoiceData?.paymentDueDate}</Text>
          <Text style={styles.boldText}>Bill Amount: Rs.{invoiceData?.billAmount.toFixed(2)}</Text>
        </View>
 
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Plan Benefits</Text>
          <Text style={styles.text}>{invoiceData?.planBenefits}</Text>
        </View>
 
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Tax and Total Amount</Text>
          <Text style={styles.text}>Monthly Rentals : Rs.{monthlyRentals.toFixed(2)}</Text>
          <Text style={styles.text}>Tax (18%): Rs.{tax.toFixed(2)}</Text>
          <Text style={styles.boldText}>Total Amount: Rs.{invoiceData?.billAmount.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};
 
export default InvoicePdf;
 