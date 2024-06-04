import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
  },
  sectionContainer: {
    marginBottom: 24,
    padding: 12,
    border: "1px solid #e4e4e4",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    minHeight: 180, // Set a minimum height for each section
  },
  sectionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionColumn: {
    flex: 1,
    marginRight: 12, // Add a gap between columns
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
  table: {
    marginTop: 12,
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#3182CE",
    backgroundColor: "#3182CE",
    color: "white",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e4",
    height: 24, // Increase the height of the row
  },
  tableCell: {
    padding: 4,
    flex: 1,
    fontSize: 10,
    color: "#4A4A4A", // Adjust the text color
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
            <Text style={styles.title}>ASAAP MOBILE SERVICES</Text>
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

        <View style={styles.sectionRow}>
          <View style={styles.sectionColumn}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Customer Details</Text>
              <Text style={styles.text}>Full Name: {invoiceData?.fullName}</Text>
              <Text style={styles.text}>Address: {invoiceData?.address}</Text>
            </View>
          </View>
          <View style={styles.sectionColumn}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Invoice Details</Text>
              <Text style={styles.text}>
                Billing Period: {invoiceData?.startDate} to {invoiceData?.endDate}
              </Text>
              <Text style={styles.boldText}>Payment Due Date: {invoiceData?.paymentDueDate}</Text>
              <Text style={styles.boldText}>Bill Amount: Rs.{invoiceData?.billAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.sectionColumn}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Plan Benefits</Text>
              <Text style={styles.text}>{invoiceData?.planBenefits}</Text>
            </View>
          </View>
          <View style={styles.sectionColumn}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Tax and Total Amount</Text>
              <Text style={styles.text}>Monthly Rentals: Rs.{monthlyRentals.toFixed(2)}</Text>
              <Text style={styles.text}>Tax (18%): Rs.{tax.toFixed(2)}</Text>
              <Text style={styles.boldText}>Total Amount: Rs.{invoiceData?.billAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={{ ...styles.sectionColumn, flex: 2 }}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Tariff Details</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableCell}>Call rates</Text>
                  <Text style={styles.tableCell}>Local(₹)</Text>
                  <Text style={styles.tableCell}>STD(₹)</Text>
                  <Text style={styles.tableCell}>SMS rates</Text>
                  <Text style={styles.tableCell}>Local(₹)</Text>
                  <Text style={styles.tableCell}>National(₹)</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>to asaap mobile</Text>
                  <Text style={styles.tableCell}>0/min</Text>
                  <Text style={styles.tableCell}>0/min</Text>
                  <Text style={styles.tableCell}>local/national</Text>
                  <Text style={styles.tableCell}>1/msg</Text>
                  <Text style={styles.tableCell}>1.5/msg</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>to other mobile</Text>
                  <Text style={styles.tableCell}>0/min</Text>
                  <Text style={styles.tableCell}>0/min</Text>
                  <Text style={styles.tableCell}>national roaming</Text>
                  <Text style={styles.tableCell}>0.25/msg</Text>
                  <Text style={styles.tableCell}>0.38/msg</Text>
                </View>
                <View style={styles.tableRow}>
              <Text style={styles.tableCell}>to landline</Text>
              <Text style={styles.tableCell}>0/min</Text>
              <Text style={styles.tableCell}>0/min</Text>
              <Text style={styles.tableCell}>international</Text>
              <Text style={styles.tableCell}>5/msg</Text>
              <Text style={styles.tableCell}>5/msg</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>to asaap cug</Text>
              <Text style={styles.tableCell}>0/min</Text>
              <Text style={styles.tableCell}>0/min</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>video call</Text>
              <Text style={styles.tableCell}>0.05/sec</Text>
              <Text style={styles.tableCell}>0.05/sec</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>
        </View>
        </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePdf;