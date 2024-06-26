import type { FILE_TYPE } from "../file-type";

/**
 * Information about the file that never changes post upload.
 *
 * [Note: Metadatum]
 *
 * There are three different sources of metadata relating to a file.
 *
 * 1. Metadata
 * 2. Magic Metadata
 * 3. Public Magic Metadata
 *
 * The names of API entities are such for historical reasons, but we can think
 * of them as:
 *
 * 1. Metadata
 * 2. Private Mutable Metadata
 * 3. Shared Mutable Metadata
 *
 * Metadata is the original metadata that we attached to the file when it was
 * uploaded. It is immutable, and it never changes.
 *
 * Later on, the user might make changes to the file's metadata. Since the
 * metadata is immutable, we need a place to keep these mutations.
 *
 * Some mutations are "private" to the user who owns the file. For example, the
 * user might archive the file. Such modifications get written to (2), Private
 * Mutable Metadata.
 *
 * Other mutations are "public" across all the users with whom the file is
 * shared. For example, if the user (owner) edits the name of the file, all
 * people with whom this file is shared can see the new edited name. Such
 * modifications get written to (3), Shared Mutable Metadata.
 *
 * When the client needs to show a file, it needs to "merge" in 2 or 3 of these
 * sources.
 *
 * - When showing a shared file, (1) and (3) are merged, with changes from (3)
 *   taking precedence, to obtain the full metadata pertinent to the file.
 * - When showing a normal (un-shared) file, (1), (2) and (3) are merged, with
 *   changes from (2) and (3) taking precedence, to obtain the full metadata.
 *   (2) and (3) have no intersection of keys, so they can be merged in any
 *   order.
 *
 * While these sources can be conceptually merged, it is important for the
 * client to also retain the original sources unchanged. This is because the
 * metadatas (any of the three) might have keys that the current client does not
 * yet understand, so when updating some key, say filename in (3), it should
 * only edit the key it knows about but retain the rest of the source JSON
 * unchanged.
 */
export interface Metadata {
    /**
     * The file name.
     *
     * See: [Note: File name for local EnteFile objects]
     */
    title: string;
    creationTime: number;
    modificationTime: number;
    latitude: number;
    longitude: number;
    /** The "Ente" file type. */
    fileType: FILE_TYPE;
    hasStaticThumbnail?: boolean;
    hash?: string;
    imageHash?: string;
    videoHash?: string;
    localID?: number;
    version?: number;
    deviceFolder?: string;
}
