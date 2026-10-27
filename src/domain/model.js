/**
 * @typedef {Object} Subject
 * @property {string} id
 * @property {string} name
 * @property {number} order
 */

/**
 * @typedef {Object} Chapter
 * @property {string} id
 * @property {string} subjectId
 * @property {string} name
 * @property {number} order
 */

/**
 * @typedef {Object} Topic
 * @property {string} id
 * @property {string} chapterId
 * @property {string} name
 * @property {number} order
 * @property {'not_started' | 'in_progress' | 'completed'} status
 * @property {string} [completedOn]
 */

/**
 * @typedef {Object} UnderstandingRating
 * @property {string} id
 * @property {string} topicId
 * @property {number} value
 * @property {string} ratedOn
 * @property {'self_report'} source
 */

/**
 * @typedef {Object} RevisionEntry
 * @property {string} id
 * @property {string} topicId
 * @property {string} revisedOn
 */

/**
 * @typedef {Object} Exam
 * @property {string} id
 * @property {string} subjectId
 * @property {string} date
 * @property {string} [label]
 */

/**
 * @typedef {Object} StudyFlowDocument
 * @property {number} schemaVersion
 * @property {Subject[]} subjects
 * @property {Chapter[]} chapters
 * @property {Topic[]} topics
 * @property {UnderstandingRating[]} ratings
 * @property {RevisionEntry[]} revisions
 * @property {Exam[]} exams
 */

/**
 * Returns the empty document as specified in PLAN.md
 * @returns {StudyFlowDocument}
 */
export function createEmptyDocument() {
  return {
    schemaVersion: 1,
    subjects: [],
    chapters: [],
    topics: [],
    ratings: [],
    revisions: [],
    exams: []
  }
}