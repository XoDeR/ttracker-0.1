import { Context } from 'hono';
import { readData, writeData } from './utils';

type Tag = {
  id: number;
  key: string;
  color: string;
};

type TimeSpan = {
  id: number;
  start: Date;
  end: Date;
  tags: Tag[];
  note: string;
};

const TAGS_FILE = './tags.json';
const TIMESPANS_FILE = './timespans.json';

// Utility to generate numeric IDs
const generateId = (): number => Math.floor(Date.now() / 1_000_000);

// Tag CRUD
export const getTags = (c: Context) => {
  const tags = readData<Tag>(TAGS_FILE);
  return c.json(tags);
};

export const getTagById = (c: Context) => {
  const tags = readData<Tag>(TAGS_FILE);
  const tag = tags.find((t) => t.id === Number(c.req.param('id')));
  if (!tag) return c.text('Tag not found', 404);
  return c.json(tag);
};

export const createTag = async (c: Context) => {
  const newTag = await c.req.json<Tag>();
  const tags = readData<Tag>(TAGS_FILE);
  newTag.id = generateId();
  tags.push(newTag);
  writeData(TAGS_FILE, tags);
  return c.json(newTag, 201);
};

export const updateTag = async (c: Context) => {
  const tagId = Number(c.req.param('id'));
  const updatedTag = await c.req.json<Tag>();
  const tags = readData<Tag>(TAGS_FILE);
  const tagIndex = tags.findIndex((t) => t.id === tagId);
  if (tagIndex === -1) return c.text('Tag not found', 404);
  tags[tagIndex] = { ...tags[tagIndex], ...updatedTag };
  writeData(TAGS_FILE, tags);
  return c.json(tags[tagIndex]);
};

export const deleteTag = (c: Context) => {
  const tagId = Number(c.req.param('id'));
  const tags = readData<Tag>(TAGS_FILE);
  const filteredTags = tags.filter((t) => t.id !== tagId);
  if (tags.length === filteredTags.length) return c.text('Tag not found', 404);
  writeData(TAGS_FILE, filteredTags);
  return new Response(null, { status: 204 });
};

// TimeSpan CRUD Operations

export const getTimeSpans = (c: Context) => {
  const timeSpans = readData<TimeSpan>(TIMESPANS_FILE);
  return c.json(timeSpans);
};

export const getTimeSpanById = (c: Context) => {
  const timeSpans = readData<TimeSpan>(TIMESPANS_FILE);
  const timeSpan = timeSpans.find((t) => t.id === Number(c.req.param('id')));
  if (!timeSpan) return c.text('TimeSpan not found', 404);
  return c.json(timeSpan);
};

export const createTimeSpan = async (c: Context) => {
  const newTimeSpan = await c.req.json<TimeSpan>();
  const timeSpans = readData<TimeSpan>(TIMESPANS_FILE);
  newTimeSpan.id = Math.floor(Date.now() / 1000);
  timeSpans.push(newTimeSpan);
  writeData(TIMESPANS_FILE, timeSpans);
  return c.json(newTimeSpan, 201);
};

export const updateTimeSpan = async (c: Context) => {
  const timeSpanId = Number(c.req.param('id'));
  const updatedTimeSpan = await c.req.json<TimeSpan>();
  const timeSpans = readData<TimeSpan>(TIMESPANS_FILE);
  const timeSpanIndex = timeSpans.findIndex((t) => t.id === timeSpanId);
  if (timeSpanIndex === -1) return c.text('TimeSpan not found', 404);
  timeSpans[timeSpanIndex] = { ...timeSpans[timeSpanIndex], ...updatedTimeSpan };
  writeData(TIMESPANS_FILE, timeSpans);
  return c.json(timeSpans[timeSpanIndex]);
};

export const deleteTimeSpan = (c: Context) => {
  const timeSpanId = Number(c.req.param('id'));
  const timeSpans = readData<TimeSpan>(TIMESPANS_FILE);
  const filteredTimeSpans = timeSpans.filter((t) => t.id !== timeSpanId);
  if (timeSpans.length === filteredTimeSpans.length) return c.text('TimeSpan not found', 404);
  writeData(TIMESPANS_FILE, filteredTimeSpans);
  return new Response(null, { status: 204 });
};
