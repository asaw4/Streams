# Streams
This project is an implementation of Pipes in NodeJS.

In piping we read data from one source and provide the read data as an input
to the other source.

We read data from an input stream and send the read data to the output stream.

Why do we use Pipes ?

When we read a large chunk of data at once, it results in consuming a lot of
time and space which is undesirable.

Reading a large chunk and keeping it in memory to process it will result in halting or slowing of other process and precesses depending on it.

Therefore, we use Pipe. Pipe breaks the large chunk of data into smaller chunks 
keeps sending these smaller chunks to the write stream, hence consuming less
space and time.
