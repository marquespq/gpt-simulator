/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import DateInput from "../Date";

interface Page {
  title: string;
  pageid: number;
  thumbnail?: { source: string };
  extract?: string;
  content_urls: { desktop: { page: string } };
}

interface Event {
  year: number;
  text: string;
  pages: Page[];
}

const EventFetcher: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (month: string, day: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.wikimedia.org/feed/v1/wikipedia/pt/onthisday/events/${month}/${day}`
      );
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = ({ month, day }: { month: string; day: string }) => {
    fetchEvents(month, day);
  };
  const formatTitle = (title: string) => {
    return title?.replace(/_/g, " ");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Você sabia?</h1>
      <p className={styles.description}>
        Descubra eventos históricos e interessantes que ocorreram em uma data
        específica. <br /> <br /> Escolha um dia no calendário abaixo:
      </p>
      <div className={styles.datePicker}>
        <DateInput onDateChange={handleDateChange} />
      </div>
      {loading ? (
        <div className={styles.loader} />
      ) : events.length === 0 ? (
        <p className={styles.noEvents}>
          Para encontrar um evento selecione uma data acima!
        </p>
      ) : (
        <ul className={styles.eventsList}>
          {events.map((event, index) => (
            <li key={index} className={styles.eventItem}>
              <div className={styles.eventHeader}>
                <span className={styles.eventYear}>{event.year}</span>
                <span className={styles.eventText}>{event.text}</span>
              </div>
              <div className={styles.eventDetails}>
                {event.pages.map((page) => (
                  <div key={page.pageid} className={styles.pageCard}>
                    <img
                      src={
                        page.thumbnail
                          ? page.thumbnail.source
                          : "/emptyState.jpg"
                      }
                      alt={page.title}
                      className={styles.pageImage}
                    />
                    <div className={styles.pageInfo}>
                      <h3 className={styles.pageTitle}>
                        {formatTitle(page.title)}
                      </h3>
                      {page.extract && (
                        <p className={styles.pageDescription}>{page.extract}</p>
                      )}
                      <a
                        href={page.content_urls.desktop.page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.pageLink}
                      >
                        Leia mais
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventFetcher;
