import faiss
import numpy as np

index = None
stored_chunks = []
stored_metadata = []  # store filenames


def create_faiss_index(embeddings, chunks, filename):
    global index, stored_chunks, stored_metadata

    dim = len(embeddings[0])

    # Initialize only once
    if index is None:
        index = faiss.IndexFlatL2(dim)

    index.add(np.array(embeddings))

    stored_chunks.extend(chunks)

    # Save filename for each chunk
    for _ in chunks:
        stored_metadata.append(filename)


def search_faiss(query_embedding, top_k=5, filter_doc=None):
    global index, stored_chunks, stored_metadata

    if index is None:
        return [], []

    query_embedding = np.array([query_embedding])

    # 🔥 IMPORTANT: search more results if filtering
    search_k = top_k * 3 if filter_doc else top_k

    distances, indices = index.search(query_embedding, search_k)

    results = []
    sources = []

    for i in indices[0]:
        if i < len(stored_chunks):

            # 🔥 NEW: filter by selected document
            if filter_doc and stored_metadata[i] != filter_doc:
                continue

            results.append(stored_chunks[i])
            sources.append(stored_metadata[i])

        # Stop when enough results collected
        if len(results) >= top_k:
            break

    return results, sources