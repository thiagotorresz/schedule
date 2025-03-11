import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { useScheduleStore } from '../store/scheduleStore';

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100vh',
  },
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    position: 'relative',
  },
  header: {
    marginBottom: 15,
  },
  logo: {
    width: 140,
    height: 70,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  sun: {
    width: 150,
    height: 120,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  wave: {
    width: '100vw',
    height: 70,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  dayTitle: {
    fontSize: 36,
    color: '#2F3152',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#2F3152',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    width: '48%',
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5',
  },
  timeBox: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginRight: -13,
  },
  timeText: {
    fontSize: 27,
    fontWeight: 'bold',

  },
  timeTextShadow: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', // Cor do contorno (ajuste conforme necessário)
    position: 'absolute',
  },
  activityDetails: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    paddingLeft: '28',
    paddingVertical: '3',
    textTransform: 'uppercase',
    zIndex: '1',
  },
  activityName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2F3152',
  },
  activityLocation: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2F3152',
  },
  footer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#36324C',
    fontSize: 15,
    fontWeight: 'bolder',
  },
});

export const PDFSchedule: React.FC = () => {
  const activities = useScheduleStore((state) => state.activities);
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        {daysOfWeek.map((day) => {
          const sortedActivities = activities
            .filter((activity) => activity.dayOfWeek === day)
            .sort((a, b) => a.time.localeCompare(b.time));
          const midIndex = Math.ceil(sortedActivities.length / 2);
          const firstColumn = sortedActivities.slice(0, midIndex);
          const secondColumn = sortedActivities.slice(midIndex);

          return (
            <Page key={day} size="A4" orientation="landscape" style={styles.page}>
              <Image src="/public/img/logo.jpg" style={styles.logo} />
              <Image src="/public/img/sun.jpg" style={styles.sun} />
              <Image src="/public/img/wave.jpg" style={styles.wave} />

              <Text style={styles.dayTitle}>{day.toUpperCase()}</Text>
              <Text style={styles.subtitle}>PROGRAMAÇÃO</Text>

              <View style={styles.activitiesContainer}>
                {[firstColumn, secondColumn].map((column, colIndex) => (
                  <View key={colIndex} style={styles.column}>
                    {column.map((activity, index) => {
                      const isEven = (colIndex === 0 ? index : index + 1) % 2 === 0;
                      return (
                        <View
                          key={activity.id}
                          style={styles.activity}
                        >
                          <View
                            style={[styles.timeBox, { backgroundColor: isEven ? '#0FB9AC' : '#2F3152' }]}
                          >
                            <Text style={[styles.timeText, { color: isEven ? '#2F3152' : 'white' }]}>{activity.time}</Text>
                          </View>
                          <View style={[styles.activityDetails, { borderColor: isEven ? '#0FB9AC' : '#2F3152' }]}>
                            <Text style={styles.activityName}>{activity.name}</Text>
                            <Text style={styles.activityLocation}>{activity.location}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>

              <View style={[styles.footer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                <Image src="/public/img/exclamation.png" style={{ width: 20, height: 20, marginRight: 5 }} />
                <Text>AS PROGRAMAÇÕES PODEM SOFRER ALTERAÇÕES.</Text>
              </View>
            </Page>
          );
        })}
      </Document>
    </PDFViewer>
  );
};
