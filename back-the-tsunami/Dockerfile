# Stage 1 : Build
FROM adoptopenjdk/openjdk13:debianslim

# Install dependencies
RUN apt-get update \
 && apt-get install -y --no-install-recommends git ca-certificates

WORKDIR /usr/tsunami/repos

# Clone the plugins repo
RUN git clone --depth 1 "https://github.com/google/tsunami-security-scanner-plugins"

# Clone the repo
RUN git clone --depth 1 "https://github.com/google/tsunami-security-scanner"

# Build plugins
RUN mkdir /usr/tsunami/plugins 

WORKDIR /usr/tsunami/repos/tsunami-security-scanner-plugins/google
RUN chmod +x build_all.sh \
    && ./build_all.sh \
    && cp build/plugins/*.jar /usr/tsunami/plugins
	
WORKDIR /usr/tsunami/repos/tsunami-security-scanner-plugins/community
RUN chmod +x build_all.sh \
    && ./build_all.sh \
    && cp build/plugins/*.jar /usr/tsunami/plugins
	
#WORKDIR /usr/tsunami/repos/tsunami-security-scanner-plugins/facebook
#RUN chmod +x build_all.sh \
#    && ./build_all.sh \
#    && cp build/plugins/*.jar /usr/tsunami/plugins

WORKDIR /usr/tsunami/repos/tsunami-security-scanner-plugins/govtech
RUN chmod +x build_all.sh \
    && ./build_all.sh \
    && cp build/plugins/*.jar /usr/tsunami/plugins

	
# Compile the Tsunami scanner
WORKDIR /usr/tsunami/repos/tsunami-security-scanner

COPY . .
RUN ./gradlew shadowJar \
    && cp $(find "./" -name 'tsunami-main-*-cli.jar') /usr/tsunami/tsunami.jar \
    && cp ./tsunami.yaml /usr/tsunami

# Stage 2: Release
FROM adoptopenjdk/openjdk13:debianslim-jre

# Install dependencies
RUN apt-get update \
 && apt-get install -y --no-install-recommends git nmap ncrack curl ca-certificates \
 && apt-get clean \
 && mkdir -p /usr/tsunami/logs/

# Install Github CLIs
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& apt update \
&& apt install gh -y

# Install Node js
RUN apt install nodejs npm -y

ENV NODE_ENV=production
ENV TSUNAMI_PATH=/usr/tsunami
ENV PLUGIN_PATH=/usr/tsunami/plugins
ENV RESULT_PATH=/usr/tsunami/logs

# Get build Tsunami from last stage
WORKDIR /usr/tsunami

COPY --from=0 /usr/tsunami /usr/tsunami

# Get source of API
WORKDIR /usr/back-the-tsunami

COPY ./ /usr/back-the-tsunami

# Install dependencies of API
RUN npm install


EXPOSE 3000
CMD node ./bin/www > ./log.out

#CMD tail -f /dev/null