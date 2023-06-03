FROM node:18
EXPOSE 8080
COPY ./src/ /
RUN ls -la src/
# CMD ["sleep", "525600"]
CMD ["npm", "run", "start"]
